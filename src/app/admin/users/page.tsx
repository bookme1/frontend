'use client';

import { useEffect } from 'react';

import { Headerstatistics } from '@/components/Headerstatistics';
import { Loading } from '@/components/SERVICE_PAGES/Loading';
import { Webstatistics } from '@/components/Webstatistics';
import AdminUserTable from '@/components/table/AdminUserTable';
// Імпорт нового компоненту
import useFetchUserData from '@/contexts/useFetchUserData';
import { IUser, Role } from '@/lib/redux/features/user/types';

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

    if (userData?.role != Role.Moderator && userData?.role != Role.Admin)
        return <div>Доступ закритий.</div>;

    const data = userData as IUser;
    return (
        <>
            <Headerstatistics username={data.username} />
            <div className="flex flex-row mt-10">
                <Webstatistics />
                <AdminUserTable />
            </div>
        </>
    );
}
