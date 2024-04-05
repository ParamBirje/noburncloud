import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(String(process.env.GEMINI_API));

const generationConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
};

async function oneTimeResponse(prompt: string): Promise<string> {
  const model = genAI.getGenerativeModel({
    model: "gemini-pro",
    generationConfig,
  });

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  return text;
}

export async function getRequirements(): Promise<string> {
  const prompt = `generate a short app description that includes what the app is about, the technical features it includes these requirements will be used by a cloud architect to plan an architecture. Don't mention any cloud services.`;

  const text = await oneTimeResponse(prompt);
  return text;
}

export async function getArchitectureComponents(desc: string): Promise<string> {
  const prompt = `Architecture: ${desc}. \n\n Strictly use services listed in the architecture description. Use this architecture description and generate a json file and strictly list the exact services in this format\n
  [
  {
  name: "Name of the cloud service",
  cloud: "Cloud platform",
  description: "State what this service will be used for according to the architecture description provided"
  }]\n
  
  \n\nPer task, choose only one suitable service. No two services for the same task.
  
  \n\ndirectly output the validated json in string format, no additional text
  \nno chinese characters, only english`;

  const text = await oneTimeResponse(prompt);
  return text;
}
