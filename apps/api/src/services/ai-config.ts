import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(String(process.env.GEMINI_API));

const generationConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

const model = genAI.getGenerativeModel({
  model: "gemini-pro",
  generationConfig,
  safetySettings,
});

export async function oneTimeResponse(prompt: string): Promise<string> {
  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  return text;
}

export async function chatResponse(latestMsg: string, history: Content[]) {
  const chat = model.startChat({
    history: history,
    // generationConfig: {
    //   maxOutputTokens: 100,
    // },
  });

  const msg = latestMsg;

  const result = await chat.sendMessage(msg);
  const response = await result.response;
  const text = response.text();

  return text;
}
