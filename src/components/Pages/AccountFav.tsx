'use client';

import { Favorite } from '@/components/Favorite';
import { LeftMenu } from '@/components/account/LeftMenu';
import { BreadCrumbs } from '@/components/common/BreadCrumbs';
import { Header } from '@/components/common/Header';
import { IUser } from '@/lib/redux/features/user/types';
import { Wrapper } from '@/styles/globals.styles';

interface AccountFavProps {
    user: IUser | null;
    favQuantity: number | null;
}

export const AccountFav: React.FC<AccountFavProps> = ({ user, favQuantity }) => {
    // const { userData, isLoading, fetchUserData } = useFetchUserData();
    // const router = useRouter();

    // useEffect(() => {
    //     if (typeof window !== 'undefined') {
    //         fetchUserData();
    //     }
    // }, [fetchUserData]);

    // const isAuthorized = useMemo(() => !!userData, [userData]);

    // if (isLoading) {
    //     return <Loading />;
    // }

    // if (!isAuthorized && !isLoading) {
    //     router.replace('/');
    //     return null;
    // }

    // const data = userData as IUser;

    return (
        <Wrapper>
            <Header userData={user} favQuantity={favQuantity}/>
            <BreadCrumbs name="акаунт" />
            <LeftMenu username={user?.username} />
            <Favorite />
        </Wrapper>
    );
};
