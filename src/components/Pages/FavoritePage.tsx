'use client';

import { IBook } from '@/app/book/[id]/page.types';
import { Favorite } from '@/components/Favorite';
import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';
import { IUser } from '@/lib/redux/features/user/types.ts';

interface FavoritePageProps {
    user: IUser | null;
    favBooks: IBook[] | null | undefined;
    favQuantity: number | null;
}

const FavoritePage: React.FC<FavoritePageProps> = ({
    user,
    favBooks,
    favQuantity,
}) => {
    return (
        <>
            <Header userData={user} favQuantity={favQuantity} />
            <Favorite favBooks={favBooks} isAutorized={user ? true : false} />
            <Footer />
        </>
    );
};

export default FavoritePage;
