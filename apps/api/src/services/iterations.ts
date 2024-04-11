import { oneTimeResponse } from "./ai-config";

export async function getRandomIteration(
  requirement: string,
  architecturePrompt: string
) {
  const prompt = `app requirements;
  \n${requirement}
  
  \n\ncloud architecture config;
  \n${architecturePrompt}
  
  \n\nusing this architecture description and app description, suggest a new improvement or a new feature to the app that would need an update to the cloud architecture config. DONT suggest already implemented ones.
  
  \n\nonly include a title and a very concise description.`;
  const text = await oneTimeResponse(prompt);
  return text;
}
