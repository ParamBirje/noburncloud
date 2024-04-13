type ChatHistoryContent = {
  role: "model" | "user";
  parts: {
    text: string;
  }[];
};

type Iteration = {
  title: string;
  description: string;
};

type PlayerStats = {
  users: number;
  billingCost: number;
  satisfaction: number;
};
