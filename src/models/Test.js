import mongoose from "mongoose";

const TestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    numQuestions: {
      type: Number,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    timeLimit: {
      type: Number,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    questions: [
      {
        text: String,
        options: [String],
        correctAnswer: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Test || mongoose.model("Test", TestSchema);
