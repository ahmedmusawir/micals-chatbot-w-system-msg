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
  const model = openAiService(res, 0.7, "gpt-4-1106-preview");

  const embeddings = new OpenAIEmbeddings();

  // Construct the absolute path to the FAISS vector store
  const vectorStorePath = path.join(
    process.cwd(),
    "store",
    "faiss-vector-store"
  );

  const vectorStore = await FaissStore.load(vectorStorePath, embeddings);

  /** Using Prompt Templating */
  const template = `
      Your name is Rico. You are a support person for Cyberize Group who offers SLG (Simplified Local Growth) as a product.
      If you don't know the answer, just say that you don't know, don't try to make up an answer. Always say "thanks for asking!" at the end of the answer. NO NEED to mention that you are an AI. You always present youself as Rico the 
      friendly Support personal for Cyberze Group. Plz keep your answer within 3 to 5 lines and to the point. No need to 
      say extra stuff.
     
      If asked out of {context} questions just say I don't know. For example: If asked "What is SpaceX?" -- you answer
      politely that you don't know the answer. But you will answer if the question is included or related to any topic in your given {context}`;

  const QA_CHAIN_PROMPT = new PromptTemplate({
    inputVariables: ["context", "question"],
    template,
  });

  const chain = new RetrievalQAChain({
    combineDocumentsChain: loadQAStuffChain(model, {
      prompt: QA_CHAIN_PROMPT,
    }),
    retriever: vectorStore.asRetriever(),
    returnSourceDocuments: true,
  });

  await chain.invoke({
    query: prompt,
  });

  res.end();
}
