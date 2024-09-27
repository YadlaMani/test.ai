import React from "react";
import { getTestById } from "@/actions";
import TestQuestion from "@/components/TestQuestion";

export default async function TestPage({ params }) {
  const { testId } = params;
  const test = await getTestById(testId);

  if (!test) {
    return <div>Test not found</div>;
  }

  return (
    <div className="container mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold mb-4">{test.title}</h1>
      <p className="mb-4">{test.description}</p>
      <div className="mb-4">
        <strong>Difficulty:</strong> {test.difficulty}
      </div>
      <div className="mb-4">
        <strong>Time Limit:</strong> {test.timeLimit} minutes
      </div>
      <div className="mb-6">
        <strong>Tags:</strong> {test.tags.join(", ")}
      </div>

      <div className="space-y-8">
        {test.questions.map((question, index) => (
          <TestQuestion key={index} question={question} index={index} />
        ))}
      </div>
    </div>
  );
}
