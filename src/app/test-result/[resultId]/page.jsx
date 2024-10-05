"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getTestResult } from "@/actions/testActions";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";

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
    return <div className="flex justify-center items-center h-64">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  }

  return (
    <div className="relative pb-6">
      {" "}
      <div className="absolute top-4 right-4">
        <Link href="/dashboard">
          <Button
            variant="secondary"
            className="bg-black text-white hover:bg-black dark:bg-white dark:text-black"
          >
            Back to Dashboard
          </Button>
        </Link>
      </div>
      {/* Main Content */}
      <div className="container mx-auto max-w-3xl px-6">
        <h1 className="text-3xl font-bold mb-6 p-4">Test Result</h1>
        <div className="bg-white text-black dark:bg-zinc-900 dark:text-white shadow-md rounded-xl p-6 mb-6">
          <p className="text-2xl font-semibold mb-2">Score: {result.score}%</p>
          <p>Correct Answers: {result.correctAnswers}</p>
          <p>Wrong Answers: {result.wrongAnswers}</p>
        </div>

        <h2 className="text-2xl font-bold mb-4 px-4">Analysis</h2>
        <div className="bg-white text-black dark:bg-zinc-900 dark:text-white shadow-md rounded-xl p-6 mb-6">
          <p>{result.analysis}</p>
        </div>

        <h2 className="text-2xl font-bold mb-4 px-4">Question Details</h2>

        {result.questions && result.questions.length > 0 ? (
          result.questions.map((question, index) => (
            <div
              key={index}
              className="bg-white text-black dark:bg-zinc-900 dark:text-white shadow-md rounded-xl p-6 mb-6"
            >
              <h3 className="text-xl font-semibold mb-2">
                Question {index + 1}
              </h3>
              <p className="mb-2">{question.questionText}</p>

              {/* Display Options */}
              <div className="mb-4">
                <p className="font-semibold">Options:</p>
                <ul className="list-disc ml-5">
                  {question.options.map((option, idx) => (
                    <li key={idx}>{option}</li>
                  ))}
                </ul>
              </div>

              <p className="mb-1">
                Your Answer:{" "}
                <span className="font-semibold">{question.userAnswer}</span>
              </p>
              <p className="mb-1">
                Correct Answer:{" "}
                <span className="font-semibold">{question.correctAnswer}</span>
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                {question.isCorrect ? "✓ Correct" : "✗ Incorrect"}
              </p>
              {question.explanation && (
                <p className="mt-2 text-gray-500 dark:text-gray-300">
                  Explanation: {question.explanation}
                </p>
              )}
            </div>
          ))
        ) : (
          <p>No questions found for this test.</p>
        )}
      </div>
    </div>
  );
};

export default TestResultPage;
