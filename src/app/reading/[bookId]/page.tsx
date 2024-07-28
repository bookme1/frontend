'use client';

import { useEffect } from 'react';

import { Loading } from '@/components/SERVICE_PAGES/Loading';
import { BookContent } from '@/components/bookReading/bookContent/BookContent';
import BookHeader from '@/components/bookReading/bookReadingHeader/Header';
import PageTurner from '@/components/bookReading/pageTurner/PageTurner';
// import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';
import Basket from '@/components/main/Modal/Basket/Basket';
import useFetchUserData from '@/contexts/useFetchUserData';
import { useSelector } from '@/lib/redux';
import { IUser } from '@/lib/redux/features/user/types';

export default function Home() {
    const modals = useSelector((state: any) => state.modals.modals);
    useEffect(() => {
        document.body.classList.add('for_light_theme');
        // document.body.classList.add('for_dark_theme');
        // document.body.classList.add('for_beige_theme');
    });

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
            <BookHeader />
            <PageTurner filter />
            <BookContent />
            <PageTurner />
            {/* <Footer /> */}
            {modals.cart.isOpen && <Basket />}
        </>
    );
}
