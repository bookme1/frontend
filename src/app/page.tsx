'use client';

import { useEffect } from 'react';

import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';
import { Categories } from '@/components/main/Categories';
import { Hero } from '@/components/main/Hero';
import SuccessInfo from '@/components/main/Modal/SuccessInfo/SuccessInfo';
import { SwiperList } from '@/components/main/SwiperList';
import useFetchUserData from '@/contexts/useFetchUserData';
import { useSelector } from '@/lib/redux';
import { IUser } from '@/lib/redux/features/user/types';

export default function Home() {
    const modals = useSelector((state: any) => state.modals.modals);

    //User authorization
    const { userData, isLoading, fetchUserData } = useFetchUserData();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedAccessToken = localStorage.getItem('accessToken');
            const storedRefreshToken = localStorage.getItem('refreshToken');

            fetchUserData(storedAccessToken, storedRefreshToken);
        }
    }, [fetchUserData]);

    const data = userData as IUser;

    return (
        <>
            <Header userData={data} isLoading={isLoading} />
            <Hero />
            <Categories />
            <SwiperList name="Популярне" />
            <SwiperList
                value="authors"
                parametrData="Стівен Кінг"
                name="Стівена Кінга"
            />
            <SwiperList value="genre" parametrData="наука" name="До школи" />
            <Footer />
            {modals.successInfo.isOpen && <SuccessInfo />}
        </>
    );
}
