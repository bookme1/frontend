'use client';

import React, { useEffect, useState } from 'react';

import { FavList, Text } from './Favorite.styles';
import { IBook } from '@/app/book/[id]/page.types';
import { useGetFavoritesQuery } from '@/lib/redux/features/book/bookApi';
import { BookType } from '@/lib/redux/features/user/types';

import { Card } from '../common/Card';

const Favorite = ({ books }: { books: IBook[] }) => {
    const token = localStorage.getItem('accessToken');
    const [favBooks, setFavBooks] = useState<IBook[]>([]);

    const {
        data: favorites,
        error,
        isLoading,
    } = useGetFavoritesQuery({
        accessToken: token ?? '',
        type: BookType.Fav,
    });

    useEffect(() => {
        if (favorites) {
            localStorage.setItem('favorites', JSON.stringify(favorites));
            setFavBooks(favorites);
        }
    }, [favorites]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const favBooksFromStorage = localStorage.getItem('favorites');
            if (favBooksFromStorage) {
                const parsedBooks: IBook[] = JSON.parse(favBooksFromStorage);
                setFavBooks(parsedBooks);
            }
        }
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading favorites</div>;

    const favUserBooks = books?.filter((book: IBook) =>
        favBooks.some((favBook: IBook) => favBook.id === book.id)
    );

    return (
        <>
            {favUserBooks?.length === 0 ? (
                <Text>There are no favorite books here</Text>
            ) : (
                <FavList>
                    {favUserBooks?.map((book: IBook) => (
                        <Card key={book.id} book={book} />
                    ))}
                </FavList>
            )}
        </>
    );
};

export default Favorite;
