'use client';

import Booksset from '@/components/Booksset/Booksset';
import { Headerstatistics } from '@/components/Headerstatistics';
import { Webstatistics } from '@/components/Webstatistics';
import { userStatisticDTO } from '@/lib/redux/features/admin/types';
import { IUser, Role } from '@/lib/redux/features/user/types';

import style from '../../../app/admin/booksets/page.module.css';

interface BooksetsProps {
    user: IUser | null;
    userStatistic: userStatisticDTO | void;
}

const Booksets: React.FC<BooksetsProps> = ({ user, userStatistic }) => {
    if (user?.role != Role.Moderator && user?.role != Role.Admin)
        return <div>Доступ закритий.</div>;

    return (
        <>
            <Headerstatistics username={user?.username} />
            <div className={style.container}>
                <Webstatistics />
                <Booksset userID={user?.id} />
            </div>
        </>
    );
};
export default Booksets;
