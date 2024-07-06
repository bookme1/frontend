// DOCS:
// This api is only for statistics in admin panel
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { userStatisticDTO } from './types';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_BACKEND_URL,
  }),
  endpoints: builder => ({
    // #################
    // BOOKS INTERACTION
    // #################
    getUserStatistic: builder.query<userStatisticDTO, string | null>({
      query: (accessToken: string | null) => ({
        url: 'api/admin/getUserStatistic',
        method: 'GET',
        cacheTime: 24 * 60 * 60 * 1000, // 1 day duration between requests
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
  }),
});

export const { useGetUserStatisticQuery } = adminApi;
