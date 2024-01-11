import datasource from "@/data-layer";
import { FiltersState } from "@/global-interfaces";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query: FiltersState = req.query as any;
  // const query = req.query as unknown as FiltersState;
  console.log("query in api post-search:", query);
  const posts = await datasource.searchPosts(query);
  // Return the query parameters for debugging purposes
  // res.status(200).json({ query: req.query });
  // const posts = await datasource.searchPosts({ isFeatured: true });
  // const jobs = await datasource.searchJobs({jobTypes: ["contract"], remoteOk: true});
  res.status(200).json(posts);
}
