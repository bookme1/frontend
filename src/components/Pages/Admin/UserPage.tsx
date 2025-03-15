'use client';

import styles from './UserPage.module.css';
import { Webstatistics } from '@/components/Webstatistics';
import AdminUserTable from '@/components/table/AdminUserTable';
import { userDTO } from '@/lib/redux/features/admin/types';

interface UserPageProps {
    allUsers: userDTO[] | string | null;
}

const UserPage: React.FC<UserPageProps> = ({ allUsers }) => {
    return (
        <>
            <div className={`wrapper ${styles.container}`}>
                <Webstatistics />
                <AdminUserTable allUsers={allUsers} />
            </div>
        </>
    );
};

export default UserPage;
