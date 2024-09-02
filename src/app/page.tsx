'use client';

import { useEffect } from 'react';

import { Loading } from '@/components/SERVICE_PAGES/Loading';
import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';
import { Categories } from '@/components/main/Categories';
import { Hero } from '@/components/main/Hero';
import Basket from '@/components/main/Modal/Basket/Basket';
import { SwiperList } from '@/components/main/SwiperList';
import useFetchUserData from '@/contexts/useFetchUserData';
import { useSelector } from '@/lib/redux';
import { BookType, IUser } from '@/lib/redux/features/user/types';
import SuccessInfo from '@/components/main/Modal/SuccessInfo/SuccessInfo';
// import { useGetUserBooksQuery } from '@/lib/redux/features/user/userApi';

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
    if (isLoading) {
        return <Loading />;
    }
    const data = userData as IUser;



    return (
        <>
            <Header userData={data} />
            <Hero />
            <Categories />
            <SwiperList name='Популярне' />
            <SwiperList value='authors' parametrData='Стівен Кінг' name='Стівена Кінга' />
            <SwiperList value="genre" parametrData="наука" name='До школи' />
            <Footer />
            {modals.cart.isOpen && <Basket />}
            {modals.successInfo.isOpen && <SuccessInfo />}
        </>
    );
}
