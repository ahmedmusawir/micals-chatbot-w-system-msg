import { NextApiRequest, NextApiResponse } from "next";
import datasource from "../../data-layer/";

// Example:
// http://localhost:3000/api/post-by-slug?slug=next-js-expert

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const postId = Number(id);

  if (!postId || Array.isArray(postId)) {
    res.status(400).json({ message: "Post ID is missing from the request." });
    return;
  }

  const data = await datasource?.getPostById(postId);
  res.status(200).json(data);
}
