'use client';

import { ChartStyle } from '@/app/admin/page.style';
import { Chartjs } from '@/components/Chartjs';
import { Chartjsbr } from '@/components/Chartjsbar';
import { Headerstatistics } from '@/components/Headerstatistics';
import { Transactions } from '@/components/Transactions';
import { Webdata } from '@/components/Webdata';
import { Webstatistics } from '@/components/Webstatistics';
import { userStatisticDTO } from '@/lib/redux/features/admin/types';
import { IUser, Role } from '@/lib/redux/features/user/types';

interface AdminPageProps {
    user: IUser | null;
    userStatistic: userStatisticDTO | void;
}

const AdminPage: React.FC<AdminPageProps> = ({ user, userStatistic }) => {
    // const {
    //     data,
    //     error,
    //     isLoading: isStatLoading,
    // } = useGetUserStatisticQuery();

    //User authorization
    // const { userData, isLoading, fetchUserData } = useFetchUserData();
    // useEffect(() => {
    //     if (typeof window !== 'undefined') {
    //         fetchUserData();
    //     }
    // }, [fetchUserData]);
    // if (isLoading) {
    //     return <Loading />;
    // }

    // if (isStatLoading) return <div>Loading...</div>;
    // if (error) return <div>Error occurred</div>;
    if (user?.role != Role.Moderator && user?.role != Role.Admin)
        return <div>Доступ закритий.</div>;

    return (
        <>
            <Headerstatistics username={user?.username} />
            <div className="flex flex-row mt-10">
                <Webstatistics />
                <div className="w-auto h-auto">
                    <Webdata
                        onlineQuantity={userStatistic?.onlineQuantity || 0}
                        newUsersQuantity={userStatistic?.newUsersQuantity || 0}
                        users={userStatistic?.users || 0}
                    />
                    <div className="mt-10 w-auto h-auto items-start">
                        {userStatistic?.statistics ? (
                            <Chartjs statistics={userStatistic.statistics} />
                        ) : (
                            <div>No statistics available</div>
                        )}
                    </div>
                </div>
                <Transactions />
            </div>
            <ChartStyle className="mt-10 ml-20 mb-10">
                <Chartjsbr />
            </ChartStyle>
            <div className="mt-10"></div>
        </>
    );
};
export default AdminPage;
