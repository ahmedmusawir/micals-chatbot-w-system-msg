import { PostsState } from "@/global-interfaces";
import { PostApiResponse } from "@/services/postService";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: PostsState = {
  posts: {
    data: [],
    meta: {
      pagination: {
        page: 0,
        pageSize: 0,
        pageCount: 0,
        total: 0,
      },
    },
  },
  status: "published",
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<PostApiResponse>) => {
      state.posts = action.payload;
    },
    setStatus: (state, action: PayloadAction<PostsState["status"]>) => {
      state.status = action.payload;
    },
  },
});

export const { setPosts, setStatus } = postsSlice.actions;
export default postsSlice.reducer;
