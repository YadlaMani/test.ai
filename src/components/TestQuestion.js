import React from "react";

export default function TestQuestion({ question, index }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Question {index + 1}</h2>
      <p className="mb-4">{question.question}</p>
      <div className="space-y-2">
        {question.options.map((option, optionIndex) => (
          <div key={optionIndex} className="flex items-center">
            <input
              type="radio"
              id={`q${index}-option${optionIndex}`}
              name={`question-${index}`}
              value={option}
              className="mr-2"
            />
            <label htmlFor={`q${index}-option${optionIndex}`}>{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
