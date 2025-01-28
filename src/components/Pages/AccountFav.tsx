'use client';

import { IBook } from '@/app/book/[id]/page.types';
import { Favorite } from '@/components/Favorite';
import { LeftMenu } from '@/components/account/LeftMenu';
import { BreadCrumbs } from '@/components/common/BreadCrumbs';
import { Header } from '@/components/common/Header';
import { IUser } from '@/lib/redux/features/user/types';
import { Wrapper } from '@/styles/globals.styles';

interface AccountFavProps {
    user: IUser | null;
    favQuantity: number | null;
    favBooks: IBook[] | null | undefined;
}

export const AccountFav: React.FC<AccountFavProps> = ({
    user,
    favQuantity,
    favBooks,
}) => {
    return (
        <Wrapper>
            <Header userData={user} favQuantity={favQuantity} />
            <BreadCrumbs name="акаунт" />
            <LeftMenu username={user?.username} />
            <Favorite favBooks={favBooks} isAutorized={user ? true : false} />
        </Wrapper>
    );
};
