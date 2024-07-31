'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Favorite } from '@/components/Favorite';
import { Loading } from '@/components/SERVICE_PAGES/Loading';
import { LeftMenu } from '@/components/account/LeftMenu';
import { BreadCrumbs } from '@/components/common/BreadCrumbs';
import { Header } from '@/components/common/Header';
import useFetchUserData from '@/contexts/useFetchUserData';
import { useGetBooksQuery } from '@/lib/redux/features/book/bookApi';
import { IUser } from '@/lib/redux/features/user/types';
import { Wrapper } from '@/styles/globals.styles';

export default function Home() {
    const { data: books, refetch: refetchBooks } = useGetBooksQuery('');

    const { userData, isLoading, fetchUserData } = useFetchUserData();
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedAccessToken = localStorage.getItem('accessToken');
            const storedRefreshToken = localStorage.getItem('refreshToken');
            fetchUserData(storedAccessToken, storedRefreshToken);
        }
    }, [fetchUserData]);

    const isAuthorized = useMemo(() => !!userData, [userData]);

    useEffect(() => {
        if (isAuthorized) {
            refetchBooks();
        }
    }, [isAuthorized, refetchBooks]);

    if (isLoading) {
        return <Loading />;
    }

    if (!isAuthorized && !isLoading) {
        // console.log('попався!');
        router.replace('/');
        return null;
    }

    const data = userData as IUser;

    return (
        <Wrapper>
            <Header userData={data} />
            {/* <button
        onClick={() => {
          bookService.updateBooksFromServer();
        }}
      >
        UPDATE
      </button> */}
            <BreadCrumbs name="акаунт" />
            <LeftMenu username={data.username} />
            <Favorite books={books} />
        </Wrapper>
    );
}