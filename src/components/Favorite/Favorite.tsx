'use client';

import React, { useEffect, useState } from 'react';

import styles from './Favorite.module.css';
import { IBook } from '@/app/book/[id]/page.types';

import BookItem from '../book/Item/BookItem';

interface FavoriteProps {
    favBooks: IBook[] | undefined | null;
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
        if (typeof window !== 'undefined' && !isAutorized) {
            const favBooksFromStorage = localStorage.getItem('favorites');
            if (favBooksFromStorage) {
                const parsedBooks: IBook[] = JSON.parse(favBooksFromStorage);
                setBooks(parsedBooks);
            }
            return;
        }
    }, [isAutorized]);

    let favoriteBooksList = favBooks?.length ? favBooks : books;

    return (
        <>
            {!favoriteBooksList || favoriteBooksList.length === 0 ? (
                <p className={styles.text}>У Вас поки що немає книжок</p>
            ) : (
                <ul className={styles.favList}>
                    {favoriteBooksList?.map((book: IBook) => (
                        <BookItem key={book.id} book={book} />
                    ))}
                </ul>
            )}
        </>
    );
};

export default Favorite;
