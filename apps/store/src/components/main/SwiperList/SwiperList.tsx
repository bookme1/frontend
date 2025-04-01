'use client';

import { IUser } from '../../../lib/redux/features/user/types';
import { CardList } from '../CardList';

const SwiperList = ({
    name,
    bookset = [],
    id,
    user,
    isBookset,
}: {
    name: string;
    parametrData?: string;
    value?: string;
    bookset: any[];
    id: number;
    user: IUser | null;
    isBookset?: boolean;
}) => {
    const booksArr = bookset;

    if (!booksArr)
        return <p>Щось пішло не так. Спробуйте перезавантажити сторінку</p>;

    return (
        <CardList
            name={name}
            books={booksArr}
            id={id}
            user={user}
            isBookset={isBookset}
        />
    );
};

export default SwiperList;
