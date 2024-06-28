import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: `https://dummyjson.com/`,
        prepareHeaders: (headers) => {
            headers.set("Accept", "application/json");
            headers.set("Content-Type", "application/json");

            return headers;
        },
    }),

    endpoints: () => ({}),
});
