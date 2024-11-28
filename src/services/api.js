import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const selectToken = (state) => state.auth.token;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      const token = selectToken(getState());
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Chat", "User", "ChatHistory"],
  endpoints: () => ({}),
});
