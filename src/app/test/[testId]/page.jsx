"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getTestById, submitTest } from "@/actions/testActions";
import TestQuestion from "@/components/TestQuestion";
import CountdownTimer from "@/components/ui/CountdownTimer";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function TestPage({ params }) {
  const { testId } = params;
  const { data: session, status } = useSession();
  const router = useRouter();
  const [test, setTest] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      toast.error("Please log in to take the test");
      router.push("/signin");
    } else if (status === "authenticated") {
      fetchTest();
    }
  }, [status, router, testId]);

  const fetchTest = async () => {
    const testData = await getTestById(testId);
    if (testData) {
      setTest(testData);
    } else {
      toast.error("Test not found");
      router.push("/");
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    if (!session || !session.user) {
      toast.error("Please log in to submit the test");
      return;
    }

    setIsSubmitting(true);
    console.log("Submitting test...", {
      testId,
      userAnswers,
      userId: session.user.id,
    });
    const result = await submitTest(testId, userAnswers, session.user.id);
    setIsSubmitting(false);

    console.log("Submit result:", result);
    if (result.success) {
      toast.success("Test submitted successfully");
      router.push(`/test-result/${result.resultId}`);
    } else {
      toast.error(result.error || "Failed to submit test");
      console.error("Submit error:", result.error);
    }
  };

  const handleTimeUp = () => {
    toast.error("Time's up! Submitting your test.");
    handleSubmit();
  };

  if (status === "loading" || !test) {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="container mx-auto max-w-3xl p-6">
      <CountdownTimer timeLimit={test.timeLimit} onTimeUp={handleTimeUp} />
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
          <TestQuestion
            key={question._id}
            question={question}
            index={index}
            onChange={(answer) => handleAnswerChange(question._id, answer)}
            userAnswer={userAnswers[question._id]}
          />
        ))}
      </div>

      <div className="mt-8">
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? "Submitting..." : "Submit Test"}
        </Button>
      </div>
    </div>
  );
}
