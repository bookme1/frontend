'use client';

import React, { useEffect } from 'react';

import { FavList, Text } from './Favorite.styles';
import { BookType, IUser } from '@/lib/redux/features/user/types';
import { useGetFavoritesQuery } from '@/lib/redux/features/user/userApi';

import { Card } from '../common/Card';

const Favorite = ({ books }: { books: any }) => {
    const token = localStorage.getItem('accessToken');

    const {
        data: favorites,
        error,
        isLoading,
    } = useGetFavoritesQuery({
        accessToken: token ?? '',
        type: BookType.Fav,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading favorites</div>;

    const favoriteArr: string[] = favorites || [];

    let favIdList: string[] = [];
    if (typeof window !== 'undefined') {
        const favIdListFromStorage = localStorage.getItem('favorites');
        favIdList = favIdListFromStorage
            ? JSON.parse(favIdListFromStorage)
            : [];
    }

    const favBooks = books?.filter((book: any) =>
        favoriteArr.includes(book.id)
    );

    return (
        <>
            {favBooks?.length === 0 ? (
                <Text>There are no favorite books here</Text>
            ) : (
                <FavList>
                    {favBooks?.map((book: any) => (
                        <Card
                            key={book.id}
                            book={book}
                            
                        />
                    ))}
                </FavList>
            )}
        </>
    );
};

export default Favorite;
