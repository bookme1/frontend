
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { CreateOrderDTO, CreateOrderDTOExtended } from './types';

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_BACKEND_URL || '',
    }),
    endpoints: builder => ({
        createOrder: builder.mutation<boolean, CreateOrderDTOExtended>({
            query: (body: CreateOrderDTOExtended) => ({
                url: 'api/order',
                method: 'POST',
                credentials: 'include',
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

export const { useCreateOrderMutation } = orderApi;
