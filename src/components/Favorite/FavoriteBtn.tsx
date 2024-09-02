'use client';

import React, { useEffect, useState } from 'react';



import { BookType } from '@/lib/redux/features/user/types';
import { useAddFavoriteMutation, useRemoveFavoriteMutation } from '@/lib/redux/features/user/userApi';



import { HeartFillStyles, HeartNotFillStyles } from '../book/MainInformation/MainInformation.styles';


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
    const token = localStorage.getItem('accessToken');
    const [addFavorite] = useAddFavoriteMutation();
    const [removeFavorite] = useRemoveFavoriteMutation();

    useEffect(() => {
        setIsFavorite(isFavAlready);
        console.log(`Favorite status updated from props: ${isFavAlready}`);
    }, [isFavAlready]);

    const handleFavoriteClick = async () => {
        if (token !== null) {
            try {
                await addFavorite({
                    accessToken: token,
                    bookId: book.id,
                    type: BookType.Fav,
                });
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
                await removeFavorite({
                    accessToken: token,
                    bookId: book.id,
                    type: BookType.Fav,
                });
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