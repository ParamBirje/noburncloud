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

export async function getArchitectureComponents(desc: string): Promise<string> {
  const prompt = `${desc} \n use this architecture description and generate a json file and list all the services mentioned in it in this format
  [
  {
  name: "Compute Engine",
  cloud: "Google Cloud Platform",
  description: "State what this service will be used for according to the architecture description provided"
  }
  
  Per task, choose only one suitable service. No two services for the same task.
  
  directly output the json, no additional text`;

  const text = await oneTimeResponse(prompt);

  return text;
}
