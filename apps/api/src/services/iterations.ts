import { oneTimeResponse } from "./ai-config";

export async function getRandomIteration(
  requirement: string,
  architecturePrompt: string
): Promise<string> {
  const prompt = `app requirements;
  \n${requirement}
  
  \n\ncloud architecture config;
  \n${architecturePrompt}
  
  \n\nusing this architecture description and app description, suggest a new improvement or a new feature to the app that would need an update to the cloud architecture config. DONT suggest already implemented ones.
  
  \n\nStrictly only include a short title and a very concise description. Strictly only use a single pipe | to seperate title and description. No styling, plain text only.`;
  const text = await oneTimeResponse(prompt);
  return text;
}

export async function getRandomCloudError(
  architecturePrompt: string
): Promise<string> {
  const prompt = `cloud architecture:
  \n${architecturePrompt}
  
  \n\nusing this architecture, generate a real error in a specific service like maintenance outage or exhaustion or overbilling for unoptimized service configs, but not confined to these examples. Generate any one random but real life scenario vulnerability on these cloud services that could happen in this architecture. Include essential information regarding the issue.
  
  \n\nOnly provide a short description. It should be written in such a way that it is happening right now or has happened.`;
  const text = await oneTimeResponse(prompt);
  return text;
}
