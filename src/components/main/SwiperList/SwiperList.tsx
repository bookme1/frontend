'use client';

import { useGetFilterBooksQuery } from '@/lib/redux/features/book/bookApi';

import { CardList } from '../CardList';

const SwiperList = ({
    name,
    parametrData,
    value,
}: {
    name: string;
    parametrData?: string;
    value?: string;
}) => {
    const { data } = useGetFilterBooksQuery({
        [value ? value : '']: parametrData,
    });

    const booksArr = data?.books;

    if (!booksArr)
        return <p>Щось пішло не так. Спробуйте перезавантажити сторінку</p>;

    console.log(booksArr);

    return <CardList name={name} books={booksArr} />;
};

export default SwiperList;
