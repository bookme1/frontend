'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';



// Змінено на правильний імпорт, якщо використовуєте redux
import { BookContent } from '@/components/bookReading/bookContent/BookContent';
import BookHeader from '@/components/bookReading/bookReadingHeader/Header';
import PageTurner from '@/components/bookReading/pageTurner/PageTurner';
import { Header } from '@/components/common/Header';
import Basket from '@/components/main/Modal/Basket/Basket';
import useFetchUserData from '@/contexts/useFetchUserData';


export default function Home() {
    const { userData } = useFetchUserData(); // Отримуємо дані користувача
    const modals = useSelector((state: any) => state.modals.modals);

    useEffect(() => {
        document.body.classList.add('for_light_theme');
        // document.body.classList.add('for_dark_theme');
        // document.body.classList.add('for_beige_theme');
    }, []);

    // Конвертуємо null в undefined
    const userDataForHeader = userData ?? undefined;

    return (
        <>
            <Header userData={userDataForHeader} /> {/* Передаємо userData в Header */}
            <BookHeader />
            <PageTurner filter />
            <BookContent />
            <PageTurner />
            {/* <Footer /> */}
            {modals.cart.isOpen && <Basket />}
        </>
    );
}