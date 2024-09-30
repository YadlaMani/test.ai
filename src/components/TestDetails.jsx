import React from "react";
import { Button } from "@/components/ui/button";

const TestDetails = ({ test, onClose }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{test.title}</h2>
      <p className="text-sm text-gray-500">
        Date: {new Date(test.date).toLocaleDateString()}
      </p>
      <p className="text-lg font-semibold">Score: {test.score}%</p>
      <p>Duration: {test.duration} minutes</p>
      <h3 className="text-xl font-semibold mt-6 mb-2">Questions:</h3>
      <ul className="space-y-4">
        {test.questions.map((question, index) => (
          <li key={index} className="border-b pb-4">
            <p className="font-medium">{question.text}</p>
            <p className="text-sm text-gray-600">
              Your answer: {question.userAnswer}
            </p>
            <p className="text-sm text-gray-600">
              Correct answer: {question.correctAnswer}
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
