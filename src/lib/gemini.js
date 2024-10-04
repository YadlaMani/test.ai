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
  For each question, provide the following details:
  - 'text': The question text as a string.
  - 'options': An array of 4 distinct answer options (as strings).
  - 'correctAnswer': The correct answer as a string, matching one of the options.

  Format the response as a JSON array of objects, each containing 'text', 'options', and 'correctAnswer'. 
  Do not include any markdown formatting or additional text outside of the JSON array.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text(); // Await the response text

    // Clean and validate the response
    const cleanedText = text.trim(); // Trim whitespace
    const parsedQuestions = cleanAndParseJSON(cleanedText);

    // Check if parsedQuestions is a valid array
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
    5. For each question, provide:
       - Whether the user's answer was correct or not
       - A brief explanation of why it was correct or incorrect

    Format the response as a JSON object with the following structure:
    {
      "score": number,
      "correctAnswers": number,
      "wrongAnswers": number,
      "analysis": string,
      "questionResults": [
        {
          "isCorrect": boolean,
          "explanation": string
        },
        ...
      ]
    }
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
