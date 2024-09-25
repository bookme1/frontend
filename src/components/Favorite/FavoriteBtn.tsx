'use client';

import React, { useEffect, useState } from 'react';

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
    const [isFavorite, setIsFavorite] = useState(isFavAlready);
    const [addToFavId, setAddToFavId] = useState<string>('');
    const [removeFromFavId, setRemoveFromFavId] = useState<string>('');
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        setIsFavorite(isFavAlready);
        console.log(`Favorite status updated from props: ${isFavAlready}`);
    }, [isFavAlready]);

    useAddBookQuery({
        accessToken: token || '',
        bookId: addToFavId,
        type: BookType.Fav,
    });
    useRemoveBookQuery({
        accessToken: token || '',
        bookId: removeFromFavId,
        type: BookType.Fav,
    });

    const handleFavoriteClick = async () => {
        if (token !== null) {
            try {
                setAddToFavId(book.id);
                console.log(`Book added to favorites: ${book.id}`);
                setIsFavorite(true);
                onToggleFavorite(true);
            } catch (error) {
                console.error('Error adding book to favorites', error);
            }
        } else {
            let favorites: string[] = JSON.parse(
                localStorage.getItem('favorites') || '[]'
            );
            favorites.push(book.id);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            console.log(`Book added to local favorites: ${book.id}`);
            setIsFavorite(true);
            onToggleFavorite(true);
        }
    };

    const handleNotFavoriteClick = async () => {
        if (token !== null) {
            try {
                setRemoveFromFavId(book.id);
                console.log(`Book removed from favorites: ${book.id}`);
                setIsFavorite(false);
                onToggleFavorite(false);
            } catch (error) {
                console.error('Error removing book from favorites', error);
            }
        } else {
            let favorites: string[] = JSON.parse(
                localStorage.getItem('favorites') || '[]'
            );
            const index = favorites.indexOf(book.id);
            if (index !== -1) {
                favorites.splice(index, 1);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                console.log(`Book removed from local favorites: ${book.id}`);
            }
            setIsFavorite(false);
            onToggleFavorite(false);
        }
    };

    return (
        <>
            {isFavorite ? (
                <HeartFillStyles onClick={handleNotFavoriteClick} />
            ) : (
                <HeartNotFillStyles onClick={handleFavoriteClick} />
            )}
        </>
    );
};

export default FavoriteBtn;
