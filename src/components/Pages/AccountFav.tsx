'use client';

import { useEffect } from 'react';

import { IBook } from '@/app/book/[id]/page.types';
import { Favorite } from '@/components/Favorite';
import { LeftMenu } from '@/components/account/LeftMenu';
import { BreadCrumbs } from '@/components/common/BreadCrumbs';
import { useGetFavoritesQuery } from '@/lib/redux/features/book/bookApi';
import { BookType, IUser } from '@/lib/redux/features/user/types';

import ErrorBoundary from '../Error/ErrorBoundary';

interface AccountFavProps {
    user: IUser | null;
}

export const AccountFav: React.FC<AccountFavProps> = ({ user }) => {
    const { data, error, isLoading } = useGetFavoritesQuery({
        type: BookType.Fav,
    });

    const favBooks = data || [];

    return (
        <div className="wrapper" style={{ minHeight: '800px' }}>
            <ErrorBoundary>
                <BreadCrumbs name="акаунт" />
                <div style={{ display: 'flex', gap: '20px' }}>
                    <LeftMenu username={user?.username} />
                    <Favorite
                        favBooks={favBooks}
                        isAutorized={user ? true : false}
                    />
                </div>
            </ErrorBoundary>
        </div>
    );
};
