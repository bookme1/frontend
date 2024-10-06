'use client';

import React, { MouseEventHandler, useEffect, useState } from 'react';

import particleStyles from './particle-animation.module.css';
import { explode } from './particles';
import {
    useAddFavoriteMutation,
    useRemoveFavoriteMutation,
} from '@/lib/redux/features/book/bookApi';
import { BookType } from '@/lib/redux/features/user/types';

import {
    HeartFillStyles,
    HeartNotFillStyles,
} from '../book/MainInformation/MainInformation.styles';

const FavoriteBtn = ({
    book,
    isFavAlready,
    onToggleFavorite,
}: {
    book: any;
    isFavAlready: boolean;
    onToggleFavorite: (isFav: boolean) => void;
}) => {
    const [isFavorite, setIsFavorite] = useState<boolean>(isFavAlready);
    const token = localStorage.getItem('accessToken');
    const [addFavorite] = useAddFavoriteMutation();
    const [removeFavorite] = useRemoveFavoriteMutation();

    useEffect(() => {
        setIsFavorite(isFavAlready);
    }, [isFavAlready]);

    const handleFavoriteClick = async (e: any) => {
        setIsFavorite(true); // Change state on click
        explode(e.pageX, e.pageY);
        onToggleFavorite(true);

        if (token !== null) {
            try {
                await addFavorite({
                    accessToken: token,
                    bookId: book.id,
                    type: BookType.Fav,
                });
                console.log(`Book added to favorites: ${book.id}`);
            } catch (error) {
                console.error('Error adding book to favorites', error);
                setIsFavorite(false); // Back if error occured on backend
                onToggleFavorite(false);
            }
        } else {
            // operations with local storage
            let favorites: string[] = JSON.parse(
                localStorage.getItem('favorites') || '[]'
            );
            favorites.push(book.id);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            console.log(`Book added to local favorites: ${book.id}`);
        }
    };

    const handleNotFavoriteClick = async () => {
        setIsFavorite(false); // Change state on click
        onToggleFavorite(false);

        if (token !== null) {
            try {
                await removeFavorite({
                    accessToken: token,
                    bookId: book.id,
                    type: BookType.Fav,
                });
                console.log(`Book removed from favorites: ${book.id}`);
            } catch (error) {
                console.error('Error removing book from favorites', error);
                setIsFavorite(true); // Go back if error occured on backend
                onToggleFavorite(true);
            }
        } else {
            // Operations with local storage
            let favorites: string[] = JSON.parse(
                localStorage.getItem('favorites') || '[]'
            );
            const index = favorites.indexOf(book.id);
            if (index !== -1) {
                favorites.splice(index, 1);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                console.log(`Book removed from local favorites: ${book.id}`);
            }
        }
    };

    return (
        <div style={{ position: 'relative' }}>
            <HeartNotFillStyles
                onClick={
                    !isFavorite ? handleFavoriteClick : handleNotFavoriteClick
                }
                className={!isFavorite ? particleStyles.heartFillAnimation : ''}
            />
        </div>
    );
};

export default FavoriteBtn;
