'use client';

import { IBook } from '@/app/book/[id]/page.types';
import { Favorite } from '@/components/Favorite';
import { LeftMenu } from '@/components/account/LeftMenu';
import { BreadCrumbs } from '@/components/common/BreadCrumbs';
import { useGetFavoritesQuery } from '@/lib/redux/features/book/bookApi';
import { BookType, IUser } from '@/lib/redux/features/user/types';
import { Wrapper } from '@/styles/globals.styles';

interface AccountFavProps {
    user: IUser | null;

    favBooks: IBook[] | null | undefined;
}

export const AccountFav: React.FC<AccountFavProps> = ({
    user,

    favBooks,
}) => {

    const { data, error, isLoading } = useGetFavoritesQuery({
        type: BookType.Fav,
    });
    console.log(data)
    return (
        <Wrapper style={{ minHeight: '800px' }}>
            <BreadCrumbs name="акаунт" />
            <LeftMenu username={user?.username} />
            <Favorite favBooks={favBooks} isAutorized={user ? true : false} />
        </Wrapper>
    );
};
