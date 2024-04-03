import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(String(process.env.GEMINI_API));

async function oneTimeResponse(prompt: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  return text;
}

export async function getRequirements(): Promise<string> {
  const prompt = "Write a story about a magic backpack.";
  const text = await oneTimeResponse(prompt);

  return text;
}
