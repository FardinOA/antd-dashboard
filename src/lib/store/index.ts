import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/apiSlice";
import productSlice from "./features/products/productSlice.js";
export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        product: productSlice,
    },
    devTools: process.env.NODE_ENV !== "production" ? true : false,
    middleware: (getDefaultMiddlewares) =>
        getDefaultMiddlewares().concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
