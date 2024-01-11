import type { NextApiRequest, NextApiResponse } from "next";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage, SystemMessage } from "langchain/schema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { prompt } = req.body;
  // Create a new instance of the OpenAI model
  const model = new ChatOpenAI({
    temperature: 0.5,
    modelName: "gpt-3.5-turbo-16k",
    streaming: true,
    callbacks: [
      {
        handleLLMNewToken(token) {
          res.write(token);
        },
      },
    ],
  });

  await model.call([
    new SystemMessage(
      "Your name is Rico. You are a friendly talkative AI and provide lots of specific details from it's context. If you don't know the answer to a question, it truthfully says it doesn't know. Also, always answer in Markdown format"
    ),

    new HumanMessage(prompt),
  ]);

  res.end();
}
