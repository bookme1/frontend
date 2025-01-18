'use client';

import { useEffect, useState } from 'react';

import { ChartStyle } from '@/app/admin/page.style';
import { Chartjs } from '@/components/Chartjs';
import { Chartjsbr } from '@/components/Chartjsbar';
import { Headerstatistics } from '@/components/Headerstatistics';
import { Loading } from '@/components/SERVICE_PAGES/Loading';
import { Transactions } from '@/components/Transactions';
import { Webdata } from '@/components/Webdata';
import { Webstatistics } from '@/components/Webstatistics';
import useFetchUserData from '@/contexts/useFetchUserData';
import { useGetUserStatisticQuery } from '@/lib/redux/features/admin/adminApi';
import { IUser, Role } from '@/lib/redux/features/user/types';
import { getCookie } from '@/components/Cookie/Cookie';

export default function Home() {
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = getCookie('accessToken');
            setAccessToken(token);
        }
    }, []);

    const {
        data,
        error,
        isLoading: isStatLoading,
    } = useGetUserStatisticQuery(accessToken, {
        skip: accessToken === null,
    });

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

    if (isStatLoading) return <div>Loading...</div>;
    if (error) return <div>Error occurred</div>;
    if (userData?.role != Role.Moderator && userData?.role != Role.Admin)
        return <div>Доступ закритий.</div>;

    const _data = userData as IUser;

    return (
        <>
            <Headerstatistics username={_data.username} />
            <div className="flex flex-row mt-10">
                <Webstatistics />
                <div className="w-auto h-auto">
                    <Webdata
                        onlineQuantity={data?.onlineQuantity || 0}
                        newUsersQuantity={data?.newUsersQuantity || 0}
                        users={data?.users || 0}
                    />
                    <div className="mt-10 w-auto h-auto items-start">
                        {data?.statistics ? (
                            <Chartjs statistics={data.statistics} />
                        ) : (
                            <div>No statistics available</div>
                        )}
                    </div>
                </div>
                <Transactions />
            </div>
            <ChartStyle className="mt-10 ml-20 mb-10">
                <Chartjsbr />
            </ChartStyle>
            <div className="mt-10"></div>
        </>
    );
}
