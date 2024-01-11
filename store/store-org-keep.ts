import { apiRTKDemoPosts } from "@/features/demo/apiRTKDemoPosts";
import { apiPosts } from "@/features/posts/apiPosts";
import { apiAuth } from "@/features/auth/apiAuth";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import postSliceReducer from "@/features/posts/postsSlice";
import postsFilterReducer from "@/features/posts/postsFilterSlice";
import authSiceReducer from "@/features/auth/authSlice";

export const store = configureStore({
  reducer: {
    [apiPosts.reducerPath]: apiPosts.reducer,
    [apiRTKDemoPosts.reducerPath]: apiRTKDemoPosts.reducer,
    [apiAuth.reducerPath]: apiAuth.reducer,
    posts: postSliceReducer,
    postsFilters: postsFilterReducer,
    auth: authSiceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      apiPosts.middleware,
      apiRTKDemoPosts.middleware,
      apiAuth.middleware,
    ]),
});

setupListeners(store.dispatch);
