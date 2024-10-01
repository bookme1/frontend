import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
    BooksData,
    FiltersData,
    IBook,
    IGenre,
} from '@/app/book/[id]/page.types';

import { BookType, IUser, userBookDTO } from '../user/types';

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
        getFilterBooks: builder.query<BooksData, any>({
            query: params => {
                function createQueryString(params: { [x: string]: any }) {
                    const queryString = Object.keys(params)
                        .filter(key => params[key])
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
        // #################
        // FAVORITES INTERACTION
        // #################
        getFavorites: builder.query<
            IBook[],
            { accessToken: string; type: BookType }
        >({
            query: ({ accessToken, type }) => ({
                url: `api/user/books/${type}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }),
        }),

        addFavorite: builder.mutation<IUser, userBookDTO>({
            // Add book to favorites
            query: DTO => ({
                url: 'api/user/books',
                method: 'POST',
                body: {
                    bookId: DTO.bookId,
                    type: 'Fav',
                },
                headers: {
                    Authorization: `Bearer ${DTO.accessToken}`,
                },
            }),
        }),

        removeFavorite: builder.mutation<IUser, userBookDTO>({
            // Remove book from favorites
            query: DTO => ({
                url: 'api/user/books',
                method: 'DELETE',
                body: {
                    bookId: DTO.bookId,
                    type: 'Fav',
                },
                headers: {
                    Authorization: `Bearer ${DTO.accessToken}`,
                },
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
    useGetFavoritesQuery,
    useAddFavoriteMutation,
    useRemoveFavoriteMutation,
} = bookApi;
