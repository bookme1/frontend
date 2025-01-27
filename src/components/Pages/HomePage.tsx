'use client';

import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';
import { Categories } from '@/components/main/Categories';
import { Hero } from '@/components/main/Hero';
import SuccessInfo from '@/components/main/Modal/SuccessInfo/SuccessInfo';
import { SwiperList } from '@/components/main/SwiperList';
import { useSelector } from '@/lib/redux';
import { BookSetRequest } from '@/lib/redux/features/book/types';
import { BookType, IUser } from '@/lib/redux/features/user/types';

interface HomePageProps {
    user: IUser | null;
    booksets: BookSetRequest[] | null;
    favQuantity: number | null;
}

const HomePage: React.FC<HomePageProps> = ({ user, booksets, favQuantity }) => {
    const modals = useSelector((state: any) => state.modals.modals);

    return (
        <>
            <Header userData={user} favQuantity={favQuantity} />
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
            <Footer />
            {modals.successInfo.isOpen && <SuccessInfo />}
        </>
    );
};

export default HomePage;
