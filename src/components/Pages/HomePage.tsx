'use client';

import { Categories } from '@/components/main/Categories';
import { Hero } from '@/components/main/Hero';
import SuccessInfo from '@/components/main/Modal/SuccessInfo/SuccessInfo';
import { SwiperList } from '@/components/main/SwiperList';
import { useSelector } from '@/lib/redux';
import { BookSetRequest } from '@/lib/redux/features/book/types';

interface HomePageProps {
    booksets: BookSetRequest[] | null;
}

const HomePage: React.FC<HomePageProps> = ({ booksets }) => {
    const modals = useSelector((state: any) => state.modals.modals);

    return (
        <>
            <Hero />
            <Categories />
            {booksets &&
                booksets.map(bookset => (
                    <SwiperList
                        key={bookset.id}
                        name={bookset.title}
                        bookset={bookset.books}
                        id={bookset.id}
                    />
                ))}

            {modals.successInfo.isOpen && <SuccessInfo />}
        </>
    );
};

export default HomePage;
