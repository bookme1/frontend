import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {FiltersData, IBook, IGenre} from '@/app/book/[id]/page.types';

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
    getFilterBooks: builder.query<IBook[], any>({
      query: (params) => {
        function createQueryString(params: { [x: string]: any; }) {
          const queryString = Object.keys(params)
            .filter(key => params[key]) // Filter out keys with empty values
            .map(key => `${key}=${params[key]}`)
            .join('&');
          return queryString;
        }
        return {
          url: `api/book/filter?${createQueryString(params)}`,
          method: 'GET',
        };
      },
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
    getGenres: builder.query<IGenre[], string>({
      query: id => ({
        url: `api/filter`,
        method: 'GET',
      }),
    }),
    getFilters: builder.query<FiltersData, string>({
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
  useGetFilterBooksQuery,
  useGetFiltersQuery,
} = bookApi;
