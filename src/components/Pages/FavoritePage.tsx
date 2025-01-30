'use client';

import { IBook } from '@/app/book/[id]/page.types';
import { Favorite } from '@/components/Favorite';
import { IUser } from '@/lib/redux/features/user/types.ts';

interface FavoritePageProps {
    user: IUser | null;
    favBooks: IBook[] | null | undefined;
}

const FavoritePage: React.FC<FavoritePageProps> = ({ user, favBooks }) => {
    return <Favorite favBooks={favBooks} isAutorized={user ? true : false} />;
};

export default FavoritePage;
