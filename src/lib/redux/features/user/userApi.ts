import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
    IUser,
    getUserBookDTO,
    googleAuthDTO,
    loginOutputDTO,
    signInDTO,
    signUpDTO,
    userBookDTO,
} from './types';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_BACKEND_URL || '',
    }),
    endpoints: builder => ({
        // #####################
        // AUTHORIZATION SECTION
        // #####################
        signUp: builder.mutation<IUser, signUpDTO>({
            // Registration, sends email verification link
            query: DTO => ({
                url: `api/auth/email/signup?role=${DTO.role}`,
                method: 'POST',
                body: DTO,
            }),
        }),
        signIn: builder.mutation<loginOutputDTO, signInDTO>({
            // Login into account, if verified, otherwise sends email + no token
            query: DTO => ({
                url: 'api/auth/login',
                method: 'POST',
                body: DTO,
                credentials: 'include',
            }),
        }),
        logOut: builder.mutation<loginOutputDTO, void>({

            query: () => ({
                url: 'api/auth/logout',
                method: 'POST',

            }),
        }),
        googleAuth: builder.mutation<loginOutputDTO, googleAuthDTO>({
            // Login into account using Google
            query: DTO => ({
                url: 'api/auth/email/google',
                method: 'POST',
                body: DTO,
            }),
        }),
        refreshToken: builder.mutation<loginOutputDTO, void>({
            // Refresh user tokens by refresh token
            query: () => ({
                url: 'api/auth/refresh',
                method: 'POST',
                body: {},
                credentials: 'include',
            }),
        }),
        getData: builder.mutation<loginOutputDTO, string>({
            //get user data by token
            query: token => ({
                url: 'api/user',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),

        // ################################
        // BOOK COLLECTIONS OF USER SECTION
        // ################################

        getUserBooks: builder.query<string[], getUserBookDTO>({
            // It adds 1 book to the cart or to favorites with help of 'type'
            query: DTO => ({
                url: `api/user/books/${DTO.type}`,
                method: 'GET',
                // headers: {
                //     Authorization: `Bearer ${DTO.accessToken}`,
                // },
            }),
        }),
        addBook: builder.query<IUser, userBookDTO>({
            // It adds 1 book to the cart or to favorites with help of 'type'
            query: DTO => ({
                url: 'api/user/books',
                method: 'POST',
                body: {
                    bookId: DTO.bookId,
                    type: DTO.type,
                },
            }),
        }),
        removeBook: builder.mutation<IUser, userBookDTO>({
            // It removes 1 book from the cart or from favorites with help of 'type'
            query: DTO => ({
                url: 'api/user/books',
                method: 'DELETE',
                body: {
                    bookId: DTO.bookId,
                    type: DTO.type,
                },
                credentials: 'include',
            }),
        }),
        //updateBoughtBooks: builder.query<IUser, string>({}), //Unsure logic about adding new bought book. It should be very secure and has to be discussed with 'Elibri'
    }),
});

export const {
    useSignUpMutation,
    useSignInMutation,
    useLogOutMutation,
    useGoogleAuthMutation,
    useRefreshTokenMutation,
    useGetDataMutation,
    useAddBookQuery,
    useGetUserBooksQuery,
    useRemoveBookMutation,
} = userApi;
