'use client';

import { useEffect } from 'react';

import { IBook } from '@/app/book/[id]/page.types';
import { Favorite } from '@/components/Favorite';
import { LeftMenu } from '@/components/account/LeftMenu';
import { BreadCrumbs } from '@/components/common/BreadCrumbs';
import { useGetFavoritesQuery } from '@/lib/redux/features/book/bookApi';
import { BookType, IUser } from '@/lib/redux/features/user/types';
import { Wrapper } from '@/styles/globals.styles';

import ErrorBoundary from '../Error/ErrorBoundary';

interface AccountFavProps {
    user: IUser | null;
    favBooks: IBook[] | null | undefined;
}

export const AccountFav: React.FC<AccountFavProps> = ({ user, favBooks }) => {
    return (
        <Wrapper style={{ minHeight: '800px' }}>
            <ErrorBoundary>
                <BreadCrumbs name="акаунт" />
                <LeftMenu username={user?.username} />
                <Favorite
                    favBooks={favBooks}
                    isAutorized={user ? true : false}
                />
            </ErrorBoundary>
        </Wrapper>
    );
};
