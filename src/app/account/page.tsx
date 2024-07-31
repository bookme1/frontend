'use client';

import { useEffect, useMemo } from 'react';

import { useRouter } from 'next/navigation';

import { AccountContainer } from './page.style';
import { Loading } from '@/components/SERVICE_PAGES/Loading';
import { LeftMenu } from '@/components/account/LeftMenu';
import { UserBooks } from '@/components/account/UserBooks';
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
            if (storedAccessToken && storedRefreshToken) {
                fetchUserData(storedAccessToken, storedRefreshToken);
            }
        }
    }, [fetchUserData]);

    const isAuthorized = useMemo(() => !!userData, [userData]);

    useEffect(() => {
        if (!isLoading && !isAuthorized) {
            router.replace('/');
        }
    }, [isLoading, isAuthorized, router]);

    if (isLoading) {
        return <Loading />;
    }

    const data = userData as IUser;
    const accessToken = localStorage.getItem('accessToken');

    return (
        <Wrapper>
            <Header userData={data} />
            <BreadCrumbs name="акаунт" />
            <AccountContainer>
                <LeftMenu username={data?.username} />
                <UserBooks accessToken={accessToken} />
            </AccountContainer>
        </Wrapper>
    );
}
