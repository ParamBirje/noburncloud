import { oneTimeResponse } from "./ai-config";

export async function getRandomIteration(requirement: string) {
  const prompt = `Generate a random cloud architecture improvement or fix or feature for the following requirement: ${requirement}
  
  Include a title and a description of that in a format where the : colon is the separator. DONT label. Directly output the title and description. Make the description under 20 words. DONT output number of words.
  
  example being,
  This is an iteration: This is the description
  
  Strictly use the format of this example. Be creative and generate new suggestions.`;
  const text = await oneTimeResponse(prompt);
  return text;
}
