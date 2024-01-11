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
  const model = openAiService(res, 0.5, "gpt-3.5-turbo-16k");

  const memory = new BufferMemory({
    chatHistory: new UpstashRedisChatMessageHistory({
      sessionId: "123",
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
    input: prompt,
  });

  res.end();
}
