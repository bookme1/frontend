'use client';

import { IUser } from '@/lib/redux/features/user/types';

import { CardList } from '../CardList';

const SwiperList = ({
    name,
    bookset = [],
    id,
    user,
}: {
    name: string;
    parametrData?: string;
    value?: string;
    bookset: any[];
    id: number;
    user: IUser | null;
}) => {
    const booksArr = bookset;

    if (!booksArr)
        return <p>Щось пішло не так. Спробуйте перезавантажити сторінку</p>;

    return <CardList name={name} books={booksArr} id={id} user={user} />;
};

export default SwiperList;
