import { NextApiRequest, NextApiResponse } from "next";
import strapiApiClient from "@/services/strapiApiClient";
import { ApiError } from "@/global-interfaces";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "DELETE") {
    return res.status(405).end();
  }

  const { commentId } = req.body;
  const jwt = req.cookies.jwt; // Extract JWT from the http-only cookie

  if (!jwt) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    await strapiApiClient.delete(`/comments/${commentId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (rawError) {
    const error = rawError as ApiError;
    console.error("Error deleting comment:", error);

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
