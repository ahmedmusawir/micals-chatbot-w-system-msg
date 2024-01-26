import type { NextApiRequest, NextApiResponse } from "next";
import { UpstashRedisChatMessageHistory } from "langchain/stores/message/upstash_redis";
import { ConversationChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import openAiService from "@/services/openAiService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { prompt } = req.body;
  // Create a new instance of the OpenAI model
  const model = openAiService(res, 0.5, "gpt-4-1106-preview");

  const memory = new BufferMemory({
    chatHistory: new UpstashRedisChatMessageHistory({
      sessionId: "mical-123",
      config: {
        url: "https://flexible-reindeer-48765.upstash.io",
        token: process.env.UPSTASH_API_KEY!,
      },
    }),
  });

  const chain = new ConversationChain({
    llm: model,
    memory: memory,
  });

  await chain.call({
    system:
      "Your name is Rico. You are a helpful and polite assistant who has a sense of humor.",
    input: prompt,
  });

  res.end();
}
