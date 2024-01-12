import openAiService from "@/services/openAiService";
import { processURLToFaissVectorStore } from "@/utils/mical-gpt-utils";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const url = "https://simplifiedlocalgrowth.com/slg-1/";
  // Create a new instance of the OpenAI model
  const model = openAiService(res, 0.5, "gpt-4-1106-preview");

  //   await processURLToFaissVectorStore(url);

  //   res.status(200).json({ message: "Faiss Vector Store Updated Successfully!" });
  res.status(200).json({ message: "Faiss Vector Store is available w/ SLG!" });
}
