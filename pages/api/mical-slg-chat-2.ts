import openAiService from "@/services/openAiService";
import {
  ConversationalRetrievalQAChain,
  RetrievalQAChain,
  loadQAStuffChain,
} from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PromptTemplate } from "langchain/prompts";
import { FaissStore } from "langchain/vectorstores/faiss";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";

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

  // Construct the absolute path to the FAISS vector store
  const vectorStorePath = path.join(
    process.cwd(),
    "store",
    "faiss-vector-store"
  );

  const vectorStore = await FaissStore.load(vectorStorePath, embeddings);

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
