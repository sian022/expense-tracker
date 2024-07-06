import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Should be in .env file but for the sake of simplicity we will hardcode it here
const baseUrl = "http://localhost:5214/api";

// Initialize the api client
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
    },
  }),

  // Initialize empty endpoints
  // Endpoints will be added through injectEndpoints
  // Tag types will be added through enhanceEndpoints
  endpoints: () => ({}),
});
