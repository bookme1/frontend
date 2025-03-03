'use client';

import React, { useEffect, useState } from 'react';

import { FavList, Text } from './Favorite.styles';
import { IBook } from '@/app/book/[id]/page.types';

import BookItem from '../book/Item/BookItem';

interface FavoriteProps {
    favBooks: IBook[] | null | undefined;
    isAutorized: boolean;
}

const Favorite: React.FC<FavoriteProps> = ({ favBooks, isAutorized }) => {
    const [books, setBooks] = useState<IBook[]>([]);

    useEffect(() => {
        if (favBooks) {
            localStorage.setItem('favorites', JSON.stringify(favBooks));
            setBooks(favBooks);
        }
    }, [favBooks]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const favBooksFromStorage = localStorage.getItem('favorites');
            if (favBooksFromStorage && !isAutorized) {
                const parsedBooks: IBook[] = JSON.parse(favBooksFromStorage);
                setBooks(parsedBooks);
            }
            return;
        }
    }, [isAutorized]);

    let favoriteBooksList = favBooks;
    if (!favBooks) favoriteBooksList = books;
    return (
        <>
            {!favoriteBooksList || favoriteBooksList.length === 0 ? (
                <Text>У Вас поки що немає книжок</Text>
            ) : (
                <FavList>
                    {favoriteBooksList?.map((book: IBook) => (
                        <BookItem key={book.id} book={book} />
                    ))}
                </FavList>
            )}
        </>
    );
};

export default Favorite;
