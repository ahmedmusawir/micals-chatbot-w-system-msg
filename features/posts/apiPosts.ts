import { PostData } from "@/data-layer/post-entities";
import { FiltersState } from "@/global-interfaces";
import { PostApiResponse } from "@/services/postService";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiPosts = createApi({
  reducerPath: "apiPosts",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<PostApiResponse, FiltersState>({
      query: (filters) => {
        console.log("Filters in apiPost:", filters);
        // Constructing the query based on the filters
        let query = "post-search?";

        // SEARCH TERM
        if (filters.searchTerm) {
          query += `searchTerm=${filters.searchTerm}&`;
        }
        // FEATURED POSTS
        if (filters.isFeatured) {
          query += "isFeatured=true&";
        }
        // CATEGORY TERMS
        if (filters.categoryTerms?.length) {
          query += `categoryTerms=${filters.categoryTerms}&`;
        }
        // POST TAG TERMS
        if (filters.postTagTerms?.length) {
          query += `postTagTerms=${filters.postTagTerms}&`;
        }
        // PAGINATION PARAMS
        query += `currentPage=${filters.currentPage}&postsPerPage=${filters.postsPerPage}&`;

        return query;
      },
      // keepUnusedDataFor: 0, // to disable caching completely
    }),
  }),
});

export const { useGetPostsQuery, useLazyGetPostsQuery } = apiPosts;
