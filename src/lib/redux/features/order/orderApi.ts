// DOCS:
// This api is only for transactions and orders
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { CreateOrderDTO, CreateOrderDTOExtended } from './types';

export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_BACKEND_URL || '',
    }),
    endpoints: builder => ({
        createOrder: builder.mutation<boolean, CreateOrderDTO>({
            query: (body: CreateOrderDTOExtended) => ({
                url: 'api/order',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${body.accessToken}`,
                },
                body: {
                    order_id: body.order_id,
                    orderBooks: body.orderBooks,
                    user: body.user,
                    amount: body.amount,
                },
            }),
        }),
    }),
});

export const { useCreateOrderMutation } = adminApi;
