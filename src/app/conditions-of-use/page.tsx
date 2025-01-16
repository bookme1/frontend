'use client';

import { useEffect } from 'react';

import { ConditionsOfUse } from '@/components/ConditionsOfUse';
import { Loading } from '@/components/SERVICE_PAGES/Loading';
import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';
import useFetchUserData from '@/contexts/useFetchUserData';
import { IUser } from '@/lib/redux/features/user/types';
import { getCookie } from '@/components/Cookie/Cookie';

export default function Home() {
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
            <ConditionsOfUse />
            <Footer />
        </>
    );
}
