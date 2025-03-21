'use client';

import { useRouter } from 'next/navigation';

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
    const router = useRouter();

    return (
        <>
            {!user ? (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap:'50px',
                        height: '80vh',
                    }}
                >
                    <div style={{ fontSize: '36px', fontWeight: '700' }}>
                        Доступ закритий. Будь-ласка, авторизуйтесь
                    </div>
                    <button
                        style={{
                            padding: '20px',
                            color: 'white',
                            backgroundColor: 'var(--red)',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            fontSize: '24px',
                        }}
                        onClick={() => {
                            router.push('/');
                        }}
                    >
                        Повернутись на головну
                    </button>
                </div>
            ) : (
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
            )}
        </>
    );
};

export default AccountPageFav;
