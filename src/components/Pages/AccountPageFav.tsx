'use client';

import { AccountContainer } from '@/app/account/page.style';
import { LeftMenu } from '@/components/account/LeftMenu';
import { UserBooks } from '@/components/account/UserBooks';
import { BreadCrumbs } from '@/components/common/BreadCrumbs';
import { IOrderBook } from '@/lib/redux/features/order/types';
import { IUser } from '@/lib/redux/features/user/types';
import { Wrapper } from '@/styles/globals.styles';

interface AccountPageFavProps {
    user: IUser | null;
    userOrderBooks: IOrderBook[] | null | undefined;
}

const AccountPageFav: React.FC<AccountPageFavProps> = ({
    user,
    userOrderBooks,
}) => {
    return (
        <Wrapper>
            <BreadCrumbs name="акаунт" />
            <AccountContainer>
                <LeftMenu username={user?.username} />
                <UserBooks userOrderBooks={userOrderBooks} />
            </AccountContainer>
        </Wrapper>
    );
};

export default AccountPageFav;
