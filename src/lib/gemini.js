import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function cleanAndParseJSON(text) {
  // Remove markdown formatting
  text = text.replace(/```json\n?|\n?```/g, "").trim();
  // Remove any leading or trailing whitespace and newlines
  text = text.replace(/^\s+|\s+$/g, "");
  return JSON.parse(text);
}

export async function generateQuestions(testDetails) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Generate ${testDetails.numQuestions} multiple-choice questions for a ${testDetails.difficulty} level test on ${testDetails.tags}. 
  The test title is "${testDetails.title}" and the description is "${testDetails.description}".
  For each question, provide 4 options and indicate the correct answer.
  Format the response as a JSON array of objects, each containing 'question', 'options' (an array of 4 strings), and 'correctAnswer' (the correct option as a string).
  Do not include any markdown formatting or additional text outside of the JSON array.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  let text = response.text();

  try {
    const parsedQuestions = cleanAndParseJSON(text);

    if (!Array.isArray(parsedQuestions) || parsedQuestions.length === 0) {
      throw new Error("Invalid question format");
    }

    return parsedQuestions;
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    console.error("Raw response:", text);
    throw new Error("Failed to generate questions");
  }
}

export async function verifyTestWithGemini(test, userAnswers) {
  console.log("Verifying test with Gemini...", { test, userAnswers });
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
    Analyze the following test results:
    Test: ${JSON.stringify(test)}
    User Answers: ${JSON.stringify(userAnswers)}

    Please provide:
    1. The score (percentage of correct answers)
    2. Number of correct answers
    3. Number of wrong answers
    4. A brief analysis of the user's performance, including topics they need to improve
    5. For each question, whether the user's answer was correct or not, and a brief explanation

    Format the response as a JSON object.
  `;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const analysisText = response.text();

  console.log("Gemini API response:", analysisText);

  try {
    return cleanAndParseJSON(analysisText);
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    console.error("Raw response:", analysisText);
    throw new Error("Failed to verify test results");
  }
}
