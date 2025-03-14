'use client';

import Booksset from '@/components/Booksset/Booksset';
import { Webstatistics } from '@/components/Webstatistics';
import { IUser, Role } from '@/lib/redux/features/user/types';

import style from '../../../app/admin/booksets/page.module.css';

interface BooksetsProps {
    user: IUser | null;
}

const Booksets: React.FC<BooksetsProps> = ({ user }) => {
    if (user?.role != Role.Moderator && user?.role != Role.Admin)
        return <div>Доступ закритий.</div>;

    return (
        <>
            <div className={`wrapper ${style.container}`}>
                <Webstatistics />
                <Booksset userID={user?.id} />
            </div>
        </>
    );
};
export default Booksets;
