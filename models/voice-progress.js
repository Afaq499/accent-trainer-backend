import mongoose, { Schema } from 'mongoose';

const voiceProgressSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recognizedText: { type: String, required: true },
    accuracyScore: { type: Number, required: true },
    fluencyScore: { type: Number, required: true },
    completenessScore: { type: Number, required: true },
    pronunciationScore: { type: Number, required: true },
  },
  { timestamps: true }
);

const VoiceProgress = mongoose.model("voiceProgress", voiceProgressSchema);

export default VoiceProgress;