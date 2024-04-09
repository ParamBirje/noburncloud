type ChatHistoryContent = {
  role: "model" | "user";
  parts: {
    text: string;
  }[];
};
