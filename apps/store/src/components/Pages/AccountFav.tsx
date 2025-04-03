'use client';

import { useGetFavoritesQuery } from '../../lib/redux/features/book/bookApi';
import { BookType, IUser } from '../../lib/redux/features/user/types';
import ErrorBoundary from '../Error/ErrorBoundary';
import { Favorite } from '../Favorite';
import { LeftMenu } from '../account/LeftMenu';
import { BreadCrumbs } from '../common/BreadCrumbs';

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
