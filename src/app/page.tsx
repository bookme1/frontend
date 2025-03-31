import { Metadata } from 'next';

import HomePage from '@/components/Pages/HomePage';
import { fetchBooksets } from '@/contexts/fetchBooksets';
import { fetchUserData } from '@/contexts/fetchUserData';

export const metadata: Metadata = {
    title: 'Bookme — Онлайн книгарня',
    description:
        'Купуй та завантажуй якісні електронні книги: EPUB, MOBI, PDF. Надійно, швидко та зручно.',
    keywords:
        'електронні книги, bookme, купити книги, EPUB, MOBI, PDF, книжковий магазин',
    robots: 'index, follow',
    alternates: {
        canonical: 'https://bookme.kyiv.ua/',
    },
};

export default async function Home() {
    const booksets = await fetchBooksets();
    const user = await fetchUserData();

    return <HomePage booksets={booksets} user={user} />;
}
