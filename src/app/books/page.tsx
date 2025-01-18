'use client';

import { useEffect } from 'react';

import { Loading } from '@/components/SERVICE_PAGES/Loading';
import { Controls } from '@/components/books/Controls';
import { BreadCrumbs } from '@/components/common/BreadCrumbs';
import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';
import SuccessInfo from '@/components/main/Modal/SuccessInfo/SuccessInfo';
import useFetchUserData from '@/contexts/useFetchUserData';
import { useSelector } from '@/lib/redux';
import { IUser } from '@/lib/redux/features/user/types';
import { getCookie } from '@/components/Cookie/Cookie';

export default function Home() {
    const modals = useSelector((state: any) => state.modals.modals);

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
            <BreadCrumbs name="Каталог" />
            <Controls />
            <Footer />
            <div id="modal-root"></div>
            {modals.successInfo.isOpen && <SuccessInfo />}
        </>
    );
}
