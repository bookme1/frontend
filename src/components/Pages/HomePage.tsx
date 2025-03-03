'use client';

import { Categories } from '@/components/main/Categories';
import { Hero } from '@/components/main/Hero';
import SuccessInfo from '@/components/main/Modal/SuccessInfo/SuccessInfo';
import { SwiperList } from '@/components/main/SwiperList';
import { useSelector } from '@/lib/redux';
import { BookSetRequest } from '@/lib/redux/features/book/types';
import { IUser } from '@/lib/redux/features/user/types';

import Error from '../Error/Error';
import ErrorBoundary from '../Error/ErrorBoundary';

interface HomePageProps {
    booksets: BookSetRequest[] | null;
    user: IUser | null;
}

const HomePage: React.FC<HomePageProps> = ({ booksets, user }) => {
    const modals = useSelector((state: any) => state.modals.modals);

    return (
        <>
            <ErrorBoundary>
                <Hero />
                <Categories />
                {booksets ? (
                    booksets.map(bookset => (
                        <SwiperList
                            key={bookset.id}
                            name={bookset.title}
                            bookset={bookset.books}
                            id={bookset.id}
                            user={user}
                        />
                    ))
                ) : (
                    <Error />
                )}

                {modals.successInfo.isOpen && <SuccessInfo />}
            </ErrorBoundary>
        </>
    );
};

export default HomePage;
