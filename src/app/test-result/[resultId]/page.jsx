"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getTestResult } from "@/actions/testActions";
import toast from "react-hot-toast";

const TestResultPage = ({ params }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      toast.error("Please log in to view test results");
      router.push("/signin");
    } else if (status === "authenticated") {
      fetchTestResult();
    }
  }, [status, router, params.resultId]);

  const fetchTestResult = async () => {
    if (!session?.user?.id) return;
    const testResult = await getTestResult(params.resultId, session.user.id);
    if (testResult.success) {
      setResult(testResult.data);
    } else {
      toast.error(testResult.error || "Failed to fetch test result");
      router.push("/");
    }
  };

  if (status === "loading" || !result) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold mb-6">Test Result</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <p className="text-2xl font-semibold mb-2">Score: {result.score}%</p>
        <p>Correct Answers: {result.correctAnswers}</p>
        <p>Wrong Answers: {result.wrongAnswers}</p>
      </div>

      <h2 className="text-2xl font-bold mb-4">Analysis</h2>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <p>{result.analysis}</p>
      </div>

      <h2 className="text-2xl font-bold mb-4">Question Details</h2>
      {result.testId.questions.map((question, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-2">Question {index + 1}</h3>
          <p className="mb-2">{question.question}</p>
          <p className="mb-1">
            Your Answer:{" "}
            <span className="font-semibold">
              {result.userAnswers[question._id]}
            </span>
          </p>
          <p className="mb-1">
            Correct Answer:{" "}
            <span className="font-semibold">{question.correctAnswer}</span>
          </p>
          <p className="mt-2 text-sm text-gray-600">
            {result.userAnswers[question._id] === question.correctAnswer
              ? "✅ Correct"
              : "❌ Incorrect"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TestResultPage;
