'use client';

import styles from './AdminPage.module.css';

import { Chartjs } from '@/components/Chartjs';
import { Chartjsbr } from '@/components/Chartjsbar';
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
    if (user?.role !== Role.Moderator && user?.role !== Role.Admin)
        return <div>Доступ закритий.</div>;

    return (
        <>
            <div className={styles.container}>
                <Webstatistics />
                <div className={styles.chartWrapper}>
                    <Webdata
                        onlineQuantity={userStatistic?.onlineQuantity || 0}
                        newUsersQuantity={userStatistic?.newUsersQuantity || 0}
                        users={userStatistic?.users || 0}
                    />
                    <div className={styles.chartContainer}>
                        {userStatistic?.statistics ? (
                            <Chartjs statistics={userStatistic.statistics} />
                        ) : (
                            <div className={styles.noStatistics}>
                                No statistics available
                            </div>
                        )}
                    </div>
                </div>
                <Transactions />
            </div>
            <div className={styles.chartStyle}>
                <Chartjsbr />
            </div>
          
        </>
    );
};

export default AdminPage;
