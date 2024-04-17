import { oneTimeResponse } from "./ai-config";

export async function getMonthlyBillingCost(
  architecturePrompt: string,
  users: number
) {
  const prompt = `cloud architecture:
    \n${architecturePrompt}
    
    \n\nnumber of monthly active users: ${users}
    
    Using this cloud architecture and number of monthly users, provide an estimate of the monthly billing costs in dollars. Directly output only the cost strictly in integers entirely. Always give an output even if not a lot of information is provided.`;

  const response = await oneTimeResponse(prompt);
  return response;
}
