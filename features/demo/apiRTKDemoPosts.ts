import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiRTKDemoPosts = createApi({
  reducerPath: "apiPost",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => `posts?limit=10`,
    }),
  }),
});

export const { useGetPostsQuery } = apiRTKDemoPosts;
