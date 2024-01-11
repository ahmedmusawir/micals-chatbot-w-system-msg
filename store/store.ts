import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { apiRTKDemoPosts } from "@/features/demo/apiRTKDemoPosts";
import { apiPosts } from "@/features/posts/apiPosts";
import { apiAuth } from "@/features/auth/apiAuth";
import postSliceReducer from "@/features/posts/postsSlice";
import postsFilterReducer from "@/features/posts/postsFilterSlice";
import authSliceReducer from "@/features/auth/authSlice";
import commentsSliceReducer from "@/features/comments/commentsSlice";
import { apiComments } from "@/features/comments/apiComments";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Only auth will be persisted
};

const rootReducer = combineReducers({
  auth: authSliceReducer,
  [apiPosts.reducerPath]: apiPosts.reducer,
  [apiRTKDemoPosts.reducerPath]: apiRTKDemoPosts.reducer,
  [apiAuth.reducerPath]: apiAuth.reducer,
  [apiComments.reducerPath]: apiComments.reducer,
  posts: postSliceReducer,
  postsFilters: postsFilterReducer,
  comments: commentsSliceReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"], // This was added for redux-persist
      },
    }).concat([
      apiPosts.middleware,
      apiRTKDemoPosts.middleware,
      apiAuth.middleware,
      apiComments.middleware,
    ]),
});

export const persistor = persistStore(store);
