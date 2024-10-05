import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const TestQuestion = ({ question, index, onChange, userAnswer }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 text-black dark:text-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Question {index + 1}</h2>
      <p className="mb-4">{question.text}</p>
      <RadioGroup
        onValueChange={(value) => onChange(value)}
        value={userAnswer}
        className="space-y-2"
      >
        {question.options.map((option, optionIndex) => (
          <div key={optionIndex} className="flex items-center">
            <RadioGroupItem
              value={option}
              id={`q${index}-option${optionIndex}`}
              className="mr-2"
            />
            <Label htmlFor={`q${index}-option${optionIndex}`}>{option}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default TestQuestion;
