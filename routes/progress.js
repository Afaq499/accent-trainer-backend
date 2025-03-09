import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { assessPronunciation } from "../utils/helpers/azur-apis.js";
import ffmpeg from "fluent-ffmpeg";

import catchResponse from "../utils/catch-response.js";
import VoiceProgress from "../models/voice-progress.js";
import moment from "moment";
import mongoose from "mongoose";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

const convertToWav = (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .toFormat("wav")
      .on("end", () => resolve(outputPath))
      .on("error", (err) => reject(err))
      .save(outputPath);
  });
};

router.post(
  "/evaluate",
  upload.fields([{ name: "audio", maxCount: 1 }]),
  async (req, res) => {
    const audioPath = req.files["audio"][0].path;
    const { text, selectedAccent } = req.body;
    const wavPath = path.join(path.dirname(audioPath), "converted.wav");
    try {
      await convertToWav(audioPath, wavPath);
      const accuracyScore = await assessPronunciation(wavPath, text);
      if (accuracyScore) {
        const resp = await VoiceProgress.create({
          ...accuracyScore,
          accent: selectedAccent,
          userId: req.user._id,
        });
      }

      fs.unlinkSync(audioPath);
      fs.unlinkSync(wavPath);

      res.send({ accuracyScore });
    } catch (err) {
      console.error("error => ", err);
      fs.unlinkSync(audioPath);
      fs.unlinkSync(wavPath);
      await catchResponse({
        res,
        err,
      });
    }
  }
);

router.get("/accent-progress", async (req, res) => {
  try {
    const { startDate, endDate, accent } = req.query;
    const { _id: userId } = req.user;

    if (!userId || !startDate || !endDate) {
      return res.status(400).json({ 
        error: 'Missing required parameters: userId, startDate, endDate' 
      });
    }

    const start = moment(startDate).startOf('day').toDate();
    const end = moment(endDate).endOf('day').toDate();

    const matchCriteria = {
      userId: new mongoose.Types.ObjectId(userId),
      createdAt: { $gte: start, $lte: end }
    };

    if (accent) {
      matchCriteria.accent = accent;
    }

    const progressMetrics = await VoiceProgress.aggregate([
      {
        $match: matchCriteria
      },
      {
        $group: {
          _id: null,
          averageAccuracyScore: { $avg: '$accuracyScore' },
          averageFluencyScore: { $avg: '$fluencyScore' },
          averageCompletenessScore: { $avg: '$completenessScore' },
          averagePronunciationScore: { $avg: '$pronunciationScore' },
          totalSessions: { $sum: 1 }
        }
      }
    ]);

    if (progressMetrics.length === 0) {
      return res.json({});
    }

    res.json(progressMetrics[0]);
  } catch (error) {
    console.error('Error fetching accent progress:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
