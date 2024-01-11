import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  query: { [key: string]: string | string[] | undefined };
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Return the query parameters for debugging purposes
  res.status(200).json({ query: req.query });
}
