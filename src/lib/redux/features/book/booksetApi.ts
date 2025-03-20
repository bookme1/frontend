import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BookSetRequest, BookSetResponse } from './types';

export const booksetApi = createApi({
    reducerPath: 'booksetApi',
    baseQuery: fetchBaseQuery({
        baseUrl:
            process.env.NEXT_PUBLIC_BASE_BACKEND_URL ||
            process.env.BASE_BACKEND_URL,
    }),

    endpoints: builder => ({
        createBookSet: builder.mutation<BookSetResponse[], BookSetRequest>({
            query: newBookSet => ({
                url: '/api/bookset',
                method: 'POST',
                body: newBookSet,
            }),
        }),

        getBookSet: builder.query<BookSetResponse[], void>({
            query: () => ({
                url: '/api/bookset',
                method: 'GET',
            }),
        }),

        deleteBookSet: builder.mutation<void, number>({
            query: id => ({
                url: `/api/bookset/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useCreateBookSetMutation,
    useGetBookSetQuery,
    useDeleteBookSetMutation,
} = booksetApi;
