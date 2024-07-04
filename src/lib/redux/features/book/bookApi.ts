import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IBook } from '@/app/book/[id]/page.types';

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_BACKEND_URL,
  }),
  endpoints: builder => ({
    // #################
    // BOOKS INTERACTION
    // #################
    getBooks: builder.query<IBook[], any>({
      query: () => ({
        url: 'api/book',
        method: 'GET',
        cacheTime: 24 * 60 * 60 * 1000,
      }),
    }),
    getBookById: builder.query<IBook[], string>({
      query: id => ({
        url: `api/book/${id}`,
        method: 'GET',
      }),
    }),
    // #################
    // FILTER INTERACTION
    // #################
    getGenres: builder.query<IBook[], string>({
      query: id => ({
        url: `api/filter`,
        method: 'GET',
      }),
    }),
    getFilters: builder.query<IBook[], string>({
      query: id => ({
        url: `api/filter/filters`, // Endpoint will be changed after first deploy
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useGetGenresQuery,
  useGetFiltersQuery,
} = bookApi;
