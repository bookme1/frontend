'use client';

import React, { useEffect, useState } from 'react';

import Notiflix from 'notiflix';

import { EmptyHeart, FilledHeart } from './Favorite.styles';
import { explode } from './particles';
import { IBook } from '@/app/book/[id]/page.types';
import {
    useAddFavoriteMutation,
    useRemoveFavoriteMutation,
} from '@/lib/redux/features/book/bookApi';
import { BookType } from '@/lib/redux/features/user/types';

const FavoriteBtn = ({ book }: { book: IBook | undefined }) => {
    const [isFav, setIsFav] = useState<boolean>(false);
    const [addFavorite] = useAddFavoriteMutation();
    const [removeFavorite] = useRemoveFavoriteMutation();

    // Check if it was already changed
    useEffect(() => {
        if (localStorage && book?.id) {
            const json = localStorage.getItem('favorites');
            if (json) {
                const favBooks = JSON.parse(json);
                if (favBooks && Array.isArray(favBooks)) {
                    const isFavorite = favBooks.some(fav => fav.id === book.id);

                    setIsFav(isFavorite);
                }
            }
        }
    }, [book]);

    const handleFavoriteClick = async (e: any) => {
        setIsFav(true);
        explode(e.pageX, e.pageY);

        if (book) {
            try {
                await addFavorite({
                    bookId: book.id,
                    type: BookType.Fav,
                });
            } catch (error) {
                setIsFav(false);
                Notiflix.Notify.failure(
                    'Помилка при зміні стану книги. Помилка #1002'
                );
            }
        }

        // In all situations, add book to local storage
        if (book) {
            // operations with local storage
            let favorites: IBook[] = JSON.parse(
                localStorage.getItem('favorites') || '[]'
            );
            favorites.push(book);
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
    };

    const handleNotFavoriteClick = async () => {
        setIsFav(false); // Change state on click

        if (book) {
            try {
                await removeFavorite({
                    bookId: book.id,
                    type: BookType.Fav,
                });
            } catch (error) {
                setIsFav(true); // Go back if error occured on backend
                Notiflix.Notify.failure(
                    'Помилка при зміні стану книги. Помилка #1003'
                );
            }
        }
        // In all situations, take book to local storage
        if (book) {
            // Operations with local storage
            let favorites: IBook[] = JSON.parse(
                localStorage.getItem('favorites') || '[]'
            );
            const index = favorites.findIndex(
                favBook => favBook.id === book.id
            );
            if (index !== -1) {
                favorites.splice(index, 1);
                localStorage.setItem('favorites', JSON.stringify(favorites));
            }
        }
    };

    return (
        <div
            style={{
                position: 'relative',
                width: 32,
                height: 32,
                cursor: 'pointer',
            }}
            title="Додати/прибрати з бажаних"
        >
            <FilledHeart
                style={isFav ? undefined : { color: 'transparent' }}
                className={isFav ? 'active' : ''}
                onClick={isFav ? handleNotFavoriteClick : handleFavoriteClick}
            />
            <EmptyHeart
                onClick={isFav ? handleNotFavoriteClick : handleFavoriteClick}
            />
        </div>
    );
};

export default FavoriteBtn;
