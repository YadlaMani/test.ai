import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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
    text = text.replace(/```json\n?|\n?```/g, "").trim();

    const parsedQuestions = JSON.parse(text);

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
