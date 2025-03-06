'use client';
import { CardList } from '../CardList';

const SwiperList = ({
    name,
    bookset = [],
    id,
}: {
    name: string;
    parametrData?: string;
    value?: string;
    bookset: any[];
    id: number;
}) => {

    const booksArr = bookset;

    if (!booksArr)
        return <p>Щось пішло не так. Спробуйте перезавантажити сторінку</p>;

    return <CardList name={name} books={booksArr} id={id} />;
};

export default SwiperList;
