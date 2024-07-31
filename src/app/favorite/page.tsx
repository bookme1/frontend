'use client';

import React, { useEffect } from 'react';

import { Favorite } from '@/components/Favorite';
import { Loading } from '@/components/SERVICE_PAGES/Loading';
import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';
import useFetchUserData, { IUser } from '@/contexts/useFetchUserData';
import { useGetBooksQuery } from '@/lib/redux/features/book/bookApi';
import { useSelector } from '@/lib/redux';
import Basket from '@/components/main/Modal/Basket/Basket';

export default function Home() {
    const modals = useSelector((state: any) => state.modals.modals);
    //Books fetching
    const getBooks = useGetBooksQuery('');
    useEffect(() => {
        getBooks;
    });

    const books = getBooks.data;

    //User authorization
    const { userData, isLoading, fetchUserData } = useFetchUserData();
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedAccessToken = localStorage.getItem('accessToken');
            const storedRefreshToken = localStorage.getItem('refreshToken');
            fetchUserData(storedAccessToken, storedRefreshToken);
        }
    }, [fetchUserData]);
    if (isLoading) {
        return <Loading />;
    }
    const data = userData as IUser;

    return (
        <>
            <Header userData={data} />
            <Favorite books={books} />
            <Footer />
            {modals.cart.isOpen && <Basket />}
        </>
    );
}
