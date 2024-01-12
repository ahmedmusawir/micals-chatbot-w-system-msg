import openAiService from "@/services/openAiService";
import {
  ConversationalRetrievalQAChain,
  RetrievalQAChain,
  loadQAStuffChain,
} from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { BufferMemory } from "langchain/memory";
import { UpstashRedisChatMessageHistory } from "langchain/stores/message/upstash_redis";
import { FaissStore } from "langchain/vectorstores/faiss";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt } = req.body;
  // Create a new instance of the OpenAI model
  const model = openAiService(res, 0.5, "gpt-4-1106-preview");

  const embeddings = new OpenAIEmbeddings();
  const vectorStore = await FaissStore.load(
    "../../store/faiss-vector-store",
    embeddings
  );

  const chain = new RetrievalQAChain({
    combineDocumentsChain: loadQAStuffChain(model),
    retriever: vectorStore.asRetriever(),
    returnSourceDocuments: true,
  });

  await chain.invoke({
    query: prompt,
  });

  res.end();
}
