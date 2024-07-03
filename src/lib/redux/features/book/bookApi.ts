import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IBook } from "./types";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_BACKEND_URL,
  }),
  endpoints: (builder) => ({
    // #################
    // BOOKS INTERACTION
    // #################
    getBooks: builder.query<IBook[], any>({
      query: () => ({
        url: "api/book",
        method: "GET",
        cacheTime: 24*60*60*1000,
      }),
    }),
    getBookById: builder.query<IBook[], string>({
      query: (id) => ({
        url: `api/book/${id}`,
        method: "GET",
      }),
    }),
    // #################
    // FILTER INTERACTION
    // #################
  }),
});

export const { useGetBooksQuery, useGetBookByIdQuery } = bookApi;
