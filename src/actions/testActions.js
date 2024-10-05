"use server";

import { generateQuestions, verifyTestWithGemini } from "@/lib/gemini";

import Test from "@/models/Test";
import TestResult from "@/models/TestResult";
import dbConnect from "@/lib/dbConnect";

export async function createTest(testDetails) {
  try {
    await dbConnect();

    const questions = await generateQuestions(testDetails);
    console.log(questions, "from create test");

    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error("Invalid questions generated");
    }

    const newTest = new Test({
      ...testDetails,
      questions: questions,
    });

    await newTest.save();

    return { success: true, testId: newTest._id.toString() };
  } catch (error) {
    console.error("Error creating test:", error);
    return { success: false, error: error.message };
  }
}

export async function getTestById(testId) {
  try {
    await dbConnect();
    const test = await Test.findById(testId);
    console.log(test, "From actions page");
    if (!test) {
      return null;
    }

    return JSON.parse(JSON.stringify(test));
  } catch (error) {
    console.error("Error fetching test:", error);
    return null;
  }
}


export async function submitTest(testId, userAnswers, userId) {
  try {
    await dbConnect();
    const test = await Test.findById(testId);

    if (!test) {
      console.error("Test not found:", testId);
      return { success: false, error: "Test not found" };
    }

    console.log("Verifying test with Gemini...");
    let geminiResult;
    try {
      geminiResult = await verifyTestWithGemini(test, userAnswers);
    } catch (error) {
      console.error("Error verifying test with Gemini:", error);
      return { success: false, error: "Failed to verify test results" };
    }
    console.log("Gemini result:", geminiResult);

    const questionsFormat = test.questions.map((question, index) => ({
      questionText: question.text,
      options: question.options,
      correctAnswer: question.correctAnswer,
      userAnswer: userAnswers[question._id],
      isCorrect: geminiResult.questionResults[index].isCorrect,
      explanation: geminiResult.questionResults[index].explanation,
    }));
    console.log(questionsFormat);

    const testResult = new TestResult({
      userId: userId,
      testId: testId,
      difficulty: test.difficulty, // Include difficulty level
      score: geminiResult.score,
      correctAnswers: geminiResult.correctAnswers,
      wrongAnswers: geminiResult.wrongAnswers,
      analysis: geminiResult.analysis,
      questions: questionsFormat,
      userAnswers: userAnswers,
    });
    console.log(testResult, "the result we are getting");

    console.log("Saving test result...");
    await testResult.save();
    console.log("Test result saved successfully");

    return { success: true, resultId: testResult._id.toString() };
  } catch (error) {
    console.error("Error submitting test:", error);
    return { success: false, error: error.message || "Failed to submit test" };
  }
}

export async function getTestResult(resultId, userId) {
  try {
    await dbConnect();

    const testResult = await TestResult.findOne({
      _id: resultId,
      userId: userId,
    }).populate({
      path: "testId",
      select: "title questions",
    });

    if (!testResult) {
      return { success: false, error: "Test result not found" };
    }

    // Combine test result data with test questions
    const combinedData = {
      id: testResult._id.toString(),
      title: testResult.testId.title,
      date: testResult.createdAt,
      score: testResult.score,
      correctAnswers: testResult.correctAnswers,
      wrongAnswers: testResult.wrongAnswers,
      analysis: testResult.analysis,
      questions: testResult.questions.map((question, index) => ({
        questionText: question.questionText,
        options: question.options,
        userAnswer: question.userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect: question.isCorrect,
        explanation: question.explanation,
      })),
      userAnswers: Array.from(testResult.userAnswers.entries()), // Convert Map to Array if necessary
    };

    return {
      success: true,
      data: combinedData,
    };
  } catch (error) {
    console.error("Error fetching test result:", error);
    return { success: false, error: "Failed to fetch test result" };
  }
}

export const getUserTests = async (userId) => {
  try {
    await dbConnect();
    const testResults = await TestResult.find({ userId: userId })
      .populate("testId", "title") 
      .sort({ createdAt: -1 });

    if (testResults.length === 0) {
      console.warn("No test results found for user ID:", userId); 
    }

    return testResults.map((result) => ({
      id: result._id.toString(), 
      title: result.testId?.title || "Untitled Test",
      date: result.createdAt,
      score: result.score,
    }));
  } catch (error) {
    console.error("Error fetching user tests:", error); 
    return [];
  }
};

export async function getAllTests() {
  try {
    await dbConnect();
    const tests = await Test.find(
      {},
      {
        _id: 1,
        title: 1,
        description: 1,
        duration: 1,
        difficulty: 1,
        numQuestions: { $size: "$questions" },
      }
    ).sort({ createdAt: -1 });

    return JSON.parse(JSON.stringify(tests));
  } catch (error) {
    console.error("Error fetching all tests:", error);
    throw new Error("Failed to fetch tests");
  }
}


export const getTestStats = async (userId) => {
  try {
    await dbConnect();

    const stats = await TestResult.aggregate([
      { $match: { userId: userId } },
      {
        $lookup: {
          from: "tests",
          localField: "testId",
          foreignField: "_id",
          as: "testDetails",
        },
      },
      { $unwind: "$testDetails" },
      {
        $group: {
          _id: "$testDetails.difficulty",
          count: { $sum: 1 },
        },
      },
    ]);

    const easyCount = stats.find(stat => stat._id === "easy")?.count || 0;
    const mediumCount = stats.find(stat => stat._id === "medium")?.count || 0;
    const hardCount = stats.find(stat => stat._id === "hard")?.count || 0;

    return {
      easy: easyCount,
      medium: mediumCount,
      hard: hardCount,
    };
  } catch (error) {
    console.error("Error fetching test stats:", error);
    return { easy: 0, medium: 0, hard: 0 };
  }
};

