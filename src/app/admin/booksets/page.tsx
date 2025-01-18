'use client';
import Booksset from '@/components/Booksset/Booksset';
import style from './page.module.css'
import { getCookie } from "@/components/Cookie/Cookie";
import { Headerstatistics } from "@/components/Headerstatistics";
import { Loading } from "@/components/SERVICE_PAGES/Loading";
import { Webstatistics } from "@/components/Webstatistics";
import useFetchUserData from "@/contexts/useFetchUserData";
import { useGetUserStatisticQuery } from "@/lib/redux/features/admin/adminApi";
import { IUser, Role } from "@/lib/redux/features/user/types";
import { useEffect, useState } from "react";


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
            <div className={style.container}>
                <Webstatistics />
                <Booksset userID={userData.id}/>
            </div>

 
        </>
    );
}
