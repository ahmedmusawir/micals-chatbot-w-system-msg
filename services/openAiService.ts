import { ChatOpenAI } from "langchain/chat_models/openai";
import { NextApiResponse } from "next";

const openAiService = (
  res: NextApiResponse,
  temp: number,
  modelName: string
) => {
  const model = new ChatOpenAI({
    temperature: temp,
    modelName: modelName,
    streaming: true,
    callbacks: [
      {
        handleLLMNewToken(token) {
          res.write(token);
        },
      },
    ],
  });

  return model;
};

export default openAiService;
