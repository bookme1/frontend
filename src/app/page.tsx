'use client';

import { useEffect, useState } from 'react';

import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';
import { Categories } from '@/components/main/Categories';
import { Hero } from '@/components/main/Hero';
import SuccessInfo from '@/components/main/Modal/SuccessInfo/SuccessInfo';
import { SwiperList } from '@/components/main/SwiperList';
import useFetchUserData from '@/contexts/useFetchUserData';
import { useSelector } from '@/lib/redux';
import { IUser } from '@/lib/redux/features/user/types';
import { useSignInMutation } from '@/lib/redux/features/user/userApi';

export default function Home() {
    const modals = useSelector((state: any) => state.modals.modals);
    const [dataOfUser, setDataOfUser] = useState<IUser | null>(null);

    const [signIn] = useSignInMutation();

    //User authorization

    const { userData, isLoading, fetchUserData } = useFetchUserData();

    const handleSubmit = async (storedUser: string | null) => {
        if (!storedUser) return;
        try {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser.email && parsedUser.password) {
                // Попытка авторизации
                const response = await signIn({
                    email: parsedUser.email,
                    password: parsedUser.password,
                });
                if (response && response.data) {
                    const { tokens, user } = response.data;
                    setDataOfUser(user);
                }
            }
        } catch (err: any) {
            console.error('Error while logging in', err);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUser = sessionStorage.getItem('userCredentials');
            handleSubmit(storedUser);
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedAccessToken = localStorage.getItem('accessToken');
            const storedRefreshToken = localStorage.getItem('refreshToken');

            fetchUserData(storedAccessToken, storedRefreshToken);
        }
    }, [fetchUserData]);

    const dataUserUatorized = userData || (dataOfUser as IUser);

    return (
        <>
            <Header userData={dataUserUatorized} isLoading={isLoading} />
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
