import { NextApiRequest, NextApiResponse } from "next";
import strapiApiClient from "@/services/strapiApiClient";
import { ApiError } from "@/global-interfaces";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { content, postId, userId } = req.body;
  const jwt = req.cookies.jwt; // Extract JWT from the http-only cookie

  console.log("UserID in comment form:", userId);

  if (!jwt) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const response = await strapiApiClient.post(
      "/comments",
      {
        data: {
          content: content,
          post: postId,
          user: userId,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    return res.status(200).json(response.data);
  } catch (rawError) {
    const error = rawError as ApiError;
    console.error("Error creating comment:", error);

    // Check if the status is 500 or if there's no specific error message
    if (error.status === 500 || !error.data?.error) {
      return res.status(500).json({
        error: "An unexpected error occurred.",
      });
    }

    // Otherwise, send the specific error message
    return res.status(error.status || 400).json({
      error: error.data.error,
    });
  }
};
