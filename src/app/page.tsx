'use client';

import { useEffect, useMemo } from 'react';

import { Loading } from '@/components/SERVICE_PAGES/Loading';
import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';
import { Categories } from '@/components/main/Categories';
import { Hero } from '@/components/main/Hero';
import { SwiperList } from '@/components/main/SwiperList';
import useFetchUserData from '@/contexts/useFetchUserData';
import { IUser } from '@/lib/redux/features/user/types';

export default function Home() {
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
            <Hero />
            <Categories />
            <SwiperList />
            <Footer />
        </>
    );
}
