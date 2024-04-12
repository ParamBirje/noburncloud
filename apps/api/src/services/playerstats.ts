import { oneTimeResponse } from "./ai-config";

export async function getMonthlyBillingCost(
  architecturePrompt: string,
  users: number
) {
  const prompt = `cloud architecture:
    \n${architecturePrompt}
    
    \n\nnumber of monthly active users: ${users}
    
    Using this cloud architecture and number of monthly users, provide an estimate of the monthly billing costs in dollars. Directly output only the cost.`;

  const response = await oneTimeResponse(prompt);
  return response;
}
