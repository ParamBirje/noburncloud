import { Content } from "@google/generative-ai";
import { chatResponse, oneTimeResponse } from "./ai-config";

export async function getChatSupportResponse(
  latestMsg: string,
  history: Content[]
): Promise<string> {
  const prompt: Content[] = [
    {
      role: "user",
      parts: [
        {
          text: `Act as a cloud provider support agent, you have all the general information regarding all the cloud services. You are helping a user with a cloud service related query. Limit all your responses under 50 words. DONT give steps. Strictly give only brief overview. Give very accurate concise responses.`,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `Okay!`,
        },
      ],
    },
  ];

  history.unshift(...prompt);

  const text = await chatResponse(latestMsg, history);
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
  \nIf there are no services mentioned, then don't generate any services.
  
  \n\ndirectly output the validated json in string format, no additional text
  \nno chinese characters, only english`;

  const text = await oneTimeResponse(prompt);
  return text;
}
