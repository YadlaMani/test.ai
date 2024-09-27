import mongoose from "mongoose";

const TestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  numQuestions: { type: Number, required: true },
  difficulty: { type: String, required: true },
  timeLimit: { type: Number, required: true },
  tags: [String],
  questions: [
    {
      question: String,
      options: [String],
      correctAnswer: String,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Test || mongoose.model("Test", TestSchema);
