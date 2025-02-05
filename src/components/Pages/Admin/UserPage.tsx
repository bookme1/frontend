'use client';


import { Webstatistics } from '@/components/Webstatistics';
import AdminUserTable from '@/components/table/AdminUserTable';
import { userDTO } from '@/lib/redux/features/admin/types';
import { IUser } from '@/lib/redux/features/user/types';

interface UserPageProps {
  
    allUsers: userDTO[] | string | null;
}

const UserPage: React.FC<UserPageProps> = ({  allUsers }) => {
    return (
        <>

            <div className="flex flex-row mt-10">
                <Webstatistics />
                <AdminUserTable allUsers={allUsers}/>
            </div>
        </>
    );
};

export default UserPage;
