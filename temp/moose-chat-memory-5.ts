import type { NextApiRequest, NextApiResponse } from "next";
import { UpstashRedisChatMessageHistory } from "langchain/stores/message/upstash_redis";
import { ConversationChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import openAiService from "@/services/openAiService";
import { ChatPromptTemplate, MessagesPlaceholder } from "langchain/prompts";

interface BaseMessages {
  role: "user" | "system";
  content: string;
  timestamp?: Date;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const { prompt, systemPrompt } = req.body;
  const { prompt, systemPrompt: userSystemPrompt } = req.body;

  console.log("System Prompt from user:", userSystemPrompt);

  // Default system prompt
  const defaultSystemPrompt =
    "Your name is Rico. You are a helpful and polite assistant who has a sense of humor.";

  // Use the user-provided system prompt if it exists and is not empty, otherwise use the default
  const systemPrompt = userSystemPrompt?.trim()
    ? userSystemPrompt
    : defaultSystemPrompt;

  // Create a new instance of the OpenAI model
  const model = openAiService(res, 0.5, "gpt-4-1106-preview");

  // Construct the conversation prompt template
  const chatPrompt = ChatPromptTemplate.fromMessages([
    ["system", systemPrompt],
    new MessagesPlaceholder("chatHistory"),
    ["user", "{input}"],
  ]);

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
    prompt: chatPrompt, // Include the chat prompt in the chain
  });

  const chatHistory = await memory.loadMemoryVariables({});

  if (!chatHistory || !chatHistory.chatHistory) {
    // Handle cases where chatHistory is not available
    chatHistory.chatHistory = []; // Initialize if needed
  }

  const result = await chain.call({
    input: prompt,
    chatHistory: chatHistory.chatHistory as BaseMessages[], // Cast as BaseMessages[]
  });

  res.end();
}
