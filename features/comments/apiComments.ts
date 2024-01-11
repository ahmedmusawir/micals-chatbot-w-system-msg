import { PostData } from "@/data-layer/post-entities";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiComments = createApi({
  reducerPath: "apiComments",
  tagTypes: ["Comment"],
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    getPostById: builder.query<PostData, number>({
      query: (postId) => `post-by-id?id=${postId}`,
      providesTags: [{ type: "Comment", id: "LIST" }],
    }),
    createComment: builder.mutation({
      query: ({ content, postId, userId }) => ({
        url: `/create-comment`,
        method: "POST",
        body: {
          content,
          postId,
          userId,
        },
      }),
      invalidatesTags: [{ type: "Comment", id: "LIST" }],
    }),
    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: `/delete-comment`,
        method: "DELETE",
        body: {
          commentId,
        },
      }),
      invalidatesTags: [{ type: "Comment", id: "LIST" }],
    }),
  }),
});

export const {
  useGetPostByIdQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
} = apiComments;
