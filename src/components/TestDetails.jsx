import React from "react";
import { Button } from "@/components/ui/button";

const TestDetails = ({ test, onClose }) => {
  return (
    <div className="space-y-4 p-8">
      <h2 className="text-2xl font-bold dark:text-white">{test.title}</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Date: {new Date(test.date).toLocaleDateString()}
      </p>
      <p className="text-lg font-semibold dark:text-white">
        Score: {test.score}%
      </p>
      <p className="dark:text-white">Duration: {test.duration} minutes</p>
      <h3 className="text-xl font-semibold mt-6 mb-2 dark:text-white">
        Questions:
      </h3>
      <ul className="space-y-4">
        {test.questions.map((question, index) => (
          <li key={index} className="border-b pb-4">
            <p className="font-medium dark:text-white">
              {question.questionText}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your answer: {question.userAnswer}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Correct answer: {question.correctAnswer}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {question.isCorrect ? "✅ Correct" : "❌ Incorrect"}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Explanation: {question.explanation}
            </p>
          </li>
        ))}
      </ul>
      <Button onClick={onClose} className="mt-4">
        Close
      </Button>
    </div>
  );
};

export default TestDetails;
