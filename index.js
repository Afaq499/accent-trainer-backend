import "dotenv/config";
import express from "express";
import cors from "cors";
import { createServer } from "http";
import "./config/database.js";
import ApplyMiddlewares from "./middlewares/index.js";
import router from "./routes/index.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { assessPronunciation } from "./utils/helpers/azur-apis.js";
import ffmpeg from "fluent-ffmpeg";

const app = express();
const httpServer = createServer(app);

const convertToWav = (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .toFormat("wav")
      .on("end", () => resolve(outputPath))
      .on("error", (err) => reject(err))
      .save(outputPath);
  });
};

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

ApplyMiddlewares(app);
app.get("/", (req, res) => {
  res.send("server is runing");
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure 'uploads' directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

app.use("/v1", router);

app.post("/evaluate", upload.fields([{ name: "audio", maxCount: 1 }]), async (req, res) => {
  try {
    const audioPath = req.files["audio"][0].path;
    const text = req.body.text;

    const wavPath = path.join(path.dirname(audioPath), "converted.wav");

    await convertToWav(audioPath, wavPath);
    const accuracyScore = await assessPronunciation(
      wavPath,
      text
    );

    console.log("accuracyScore => ", accuracyScore);

    res.json({ accuracyScore });

    fs.unlinkSync(audioPath);
    fs.unlinkSync(wavPath);
  } catch (error) {
    console.error("error => ", error);
    res.status(500).json({ message: "Error evaluating speech" });
  }
});

httpServer.listen(process.env.PORT, () => {
  console.log(`App is listening on port ${process.env.PORT}`);
});
