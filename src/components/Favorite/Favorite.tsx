'use client';

import React, { useEffect, useState } from 'react';

import { FavList, Text } from './Favorite.styles';
import { IBook } from '@/app/book/[id]/page.types';
import { useGetFavoritesQuery } from '@/lib/redux/features/book/bookApi';
import { BookType } from '@/lib/redux/features/user/types';

import { Card } from '../common/Card';

const Favorite = () => {
    const [books, setBooks] = useState<IBook[]>([]);

    const {
        data: favorites,
        error,
        isLoading,
    } = useGetFavoritesQuery({
        accessToken: '',
        type: BookType.Fav,
    });

    useEffect(() => {
        if (favorites) {
            localStorage.setItem('favorites', JSON.stringify(favorites.fav));
            setBooks(favorites.fav);
        }
    }, [favorites]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const favBooksFromStorage = localStorage.getItem('favorites');
            if (favBooksFromStorage) {
                const parsedBooks: IBook[] = JSON.parse(favBooksFromStorage);
                setBooks(parsedBooks);
            }
        }
    }, []);

    if (isLoading) return <div>Завантажуємо книжки...</div>;
    if (error) return <div>Помилка при завантаженні книжок</div>;
    console.log('books', books);
    return (
        <>
            {!books || books.length === 0 ? (
                <Text>У Вас поки що немає книжок</Text>
            ) : (
                <FavList>
                    {books.map((book: IBook) => (
                        <Card key={book.id} book={book} />
                    ))}
                </FavList>
            )}
        </>
    );
};

export default Favorite;
