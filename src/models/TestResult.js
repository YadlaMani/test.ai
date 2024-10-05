
import mongoose from "mongoose";

const TestResultSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    correctAnswers: {
      type: Number,
      required: true,
    },
    wrongAnswers: {
      type: Number,
      required: true,
    },
    analysis: {
      type: String,
      required: true,
    },
    questions: [
      {
        questionText: {
          type: String,
          required: true,
        },
        options: {
          type: [String],
          required: true,
        },
        correctAnswer: {
          type: String,
          required: true,
        },
        userAnswer: {
          type: String,
          required: true,
        },
        isCorrect: {
          type: Boolean,
          required: true,
        },
        explanation: {
          type: String,
          required: true,
        },
      },
    ],
    userAnswers: {
      type: Map,
      of: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.TestResult ||
  mongoose.model("TestResult", TestResultSchema);

