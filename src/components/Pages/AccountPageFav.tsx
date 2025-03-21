'use client';

import { LeftMenu } from '@/components/account/LeftMenu';
import { UserBooks } from '@/components/account/UserBooks';
import { BreadCrumbs } from '@/components/common/BreadCrumbs';
import { IOrderBook } from '@/lib/redux/features/order/types';
import { IUser } from '@/lib/redux/features/user/types';

import ErrorBoundary from '../Error/ErrorBoundary';

interface AccountPageFavProps {
    user: IUser | null | undefined;
    userOrderBooks: IOrderBook[] | null | undefined;
}

const AccountPageFav: React.FC<AccountPageFavProps> = ({
    user,
    userOrderBooks,
}) => {

    return (
        <div
            className="wrapper"
            style={{ marginBottom: '20px', marginTop: '20px' }}
        >
            <ErrorBoundary>
                <BreadCrumbs name="акаунт" />
                <div style={{ marginTop: '20px', display: 'flex' }}>
                    <LeftMenu
                        username={user?.username}
                        isVerified={user?.verified}
                    />
                    <UserBooks userOrderBooks={userOrderBooks} />
                </div>
            </ErrorBoundary>
        </div>
    );
};

export default AccountPageFav;
