import { processURLToFaissVectorStore } from "@/utils/mical-gpt-utils";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  logs?: string[];
};

// ... existing imports

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { url } = req.body;
    // Process URL and get logs
    const logs = await processURLToFaissVectorStore(url);
    res
      .status(200)
      .json({ message: "Faiss Vector Store Updated Successfully!", logs });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
