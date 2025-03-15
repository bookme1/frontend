'use client';

import { IBook } from '@/app/book/[id]/page.types';
import { Favorite } from '@/components/Favorite';
import { useGetFavoritesQuery } from '@/lib/redux/features/book/bookApi';
import { BookType, IUser } from '@/lib/redux/features/user/types.ts';

interface FavoritePageProps {
    user: IUser | null;
    // favBooks: IBook[] | null | undefined;
}

const FavoritePage: React.FC<FavoritePageProps> = ({ user }) => {
    const { data: favBooks } = useGetFavoritesQuery({ type: BookType.Fav });

    return (
        <Favorite favBooks={favBooks} isAutorized={user ? true : false} />
    );
};

export default FavoritePage;
