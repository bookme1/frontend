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
        baseUrl: process.env.NEXT_PUBLIC_BASE_BACKEND_URL || '',
    }),


    endpoints: builder => ({
        // #################
        // BOOKS INTERACTION
        // #################
        getBooks: builder.query<IBook[], void>({
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
            query: () => ({
                url: `api/filter`,
                method: 'GET',
            }),
        }),
        getFilters: builder.query<FiltersData, string>({
            query: (q: string) => ({
                url: `api/filter/filters?q=${q}`, // Endpoint will be changed after first deploy
                method: 'GET',
            }),
        }),
        // #################
        // FAVORITES INTERACTION
        // #################
        getFavorites: builder.query<
            { id: number; fav: IBook[]; cart: IBook[] },
            { type: BookType }
        >({
            query: ({ type }) => ({
                url: `api/user/books/${type}`,
                method: 'GET',
                credentials: 'include',
            }),
        }),

        getFavoritesQuantity: builder.query<
            number,
            { accessToken: string; type: BookType }
        >({
            query: ({ accessToken, type }) => ({
                url: `api/user/books/quantity/${type}`,
                method: 'GET',
                credentials: 'include',
            }),
        }),

        addFavorite: builder.mutation<IUser, userBookDTO>({
            // Add book to favorites
            query: DTO => ({
                url: 'api/user/books',
                method: 'POST',
                body: {
                    bookId: DTO.bookId,
                    type: DTO.type,
                },
                credentials: 'include',
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
                credentials: 'include',
            }),
        }),

        // #################
        // CART INTERACTION
        // #################
        getCart: builder.query<
            { id: number; cart: IBook[] },
            { accessToken: string; type: BookType.Cart }
        >({
            query: ({ accessToken, type }) => ({
                url: `api/user/books/${type}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }),
        }),

        addCart: builder.mutation<IUser, userBookDTO>({
            // Add book to favorites
            query: DTO => ({
                url: 'api/user/books',
                method: 'POST',
                body: {
                    bookId: DTO.bookId,
                    type: 'Cart',
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
    //Fav
    useGetFavoritesQuery,
    useGetFavoritesQuantityQuery,
    useAddFavoriteMutation,
    useRemoveFavoriteMutation,
    //Cart
    useGetCartQuery,
    useAddCartMutation,
} = bookApi;
