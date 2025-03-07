import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { addLog, idLog, Log } from './types';

export const logsApi = createApi({
    reducerPath: 'logsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_BACKEND_URL || '',
    }),


    endpoints: builder => ({
        getLogs: builder.query<Log[], void>({
            query: () => ({
                url: 'api/log',
                method: 'GET',
                cacheTime: 24 * 60 * 60 * 1000,
            }),
        }),

        getOneLog: builder.mutation<idLog, { id: string }>({
            query: (DTO) => ({
                url: 'api/log',
                method: 'DELETE',
                body: {
                    id: DTO.id,
                },
                credentials: 'include',
            }),
        }),

        addLog: builder.mutation<addLog, { source: string; message: string; context: string; code: number }>({
            query: (DTO) => ({
                url: 'api/log',
                method: 'POST',
                body: {
                    source: DTO.source,
                    message: DTO.message,
                    context: DTO.context,
                    code: DTO.code,
                },
                credentials: 'include',
            }),
        }),

        removeLog: builder.mutation<idLog, { id: string }>({
            query: (DTO) => ({
                url: 'api/log',
                method: 'DELETE',
                body: {
                    id: DTO.id,
                },
                credentials: 'include',
            }),
        }),

    }),
});

export const { useGetLogsQuery, useGetOneLogMutation, useAddLogMutation, useRemoveLogMutation, } = logsApi;
