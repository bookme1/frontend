'use client';

import { Headerstatistics } from '@/components/Headerstatistics';
import { Webstatistics } from '@/components/Webstatistics';
import AdminUserTable from '@/components/table/AdminUserTable';
import { userDTO } from '@/lib/redux/features/admin/types';
import { IUser } from '@/lib/redux/features/user/types';

interface UserPageProps {
    user: IUser | null | undefined;
    allUsers: userDTO[] | string | null;
}

const UserPage: React.FC<UserPageProps> = ({ user, allUsers }) => {
    return (
        <>
            <Headerstatistics username={user?.username} />
            <div className="flex flex-row mt-10">
                <Webstatistics />
                <AdminUserTable allUsers={allUsers}/>
            </div>
        </>
    );
};

export default UserPage;
