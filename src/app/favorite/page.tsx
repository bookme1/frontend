'use client';

import React, { useEffect } from 'react';

import { getCookie } from '@/components/Cookie/Cookie';
import { Favorite } from '@/components/Favorite';
import { Loading } from '@/components/SERVICE_PAGES/Loading';
import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';
import useFetchUserData from '@/contexts/useFetchUserData';
import { useSelector } from '@/lib/redux';
import { useGetBooksQuery } from '@/lib/redux/features/book/bookApi';
import { IUser } from '@/lib/redux/features/user/types.ts';

export default function Home() {
    const modals = useSelector((state: any) => state.modals.modals);
    //Books fetching
    const getBooks = useGetBooksQuery();
    useEffect(() => {
        getBooks;
    });

    const books = getBooks.data;

    //User authorization
    const { userData, isLoading, fetchUserData } = useFetchUserData();
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedAccessToken = getCookie('accessToken');
            const storedRefreshToken = getCookie('refreshToken');
            fetchUserData(storedAccessToken, storedRefreshToken);
        }
    }, [fetchUserData]);
    if (isLoading) {
        return <Loading />;
    }
    const data = userData as IUser;

    return (
        <>
            <Header userData={data} isLoading={isLoading} />
            <Favorite />
            <Footer />
        </>
    );
}
