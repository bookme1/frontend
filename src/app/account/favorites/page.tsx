'use client';

import { useEffect, useMemo } from 'react';

import { useRouter } from 'next/navigation';

import { Favorite } from '@/components/Favorite';
import { Loading } from '@/components/SERVICE_PAGES/Loading';
import { LeftMenu } from '@/components/account/LeftMenu';
import { BreadCrumbs } from '@/components/common/BreadCrumbs';
import { Header } from '@/components/common/Header';
import useFetchUserData from '@/contexts/useFetchUserData';
import { IUser } from '@/lib/redux/features/user/types';
import { Wrapper } from '@/styles/globals.styles';

export default function Home() {
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

    if (isLoading) {
        return <Loading />;
    }

    if (!isAuthorized && !isLoading) {
        router.replace('/');
        return null;
    }

    const data = userData as IUser;

    return (
        <Wrapper>
            <Header userData={data} isLoading={isLoading} />
            <BreadCrumbs name="акаунт" />
            <LeftMenu username={data.username} />
            <Favorite />
        </Wrapper>
    );
}
