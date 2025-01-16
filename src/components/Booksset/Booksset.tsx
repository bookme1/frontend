import { useState } from 'react';

import style from './Booksset.module.css';
import {
    openModal,
    selectOpenModal,
    setModalContent,
    setModalStatus,
    useDispatch,
    useSelector,
} from '@/lib/redux';
import {
    useCreateBookSetMutation,
    useGetBookSetQuery,
} from '@/lib/redux/features/book/booksetApi';
import { BookSetRequest } from '@/lib/redux/features/book/types';

import { GenericModal } from '../GenericModal/GenericModal';
import { SwiperList } from '../main/SwiperList';

const Booksset = ({ userID }: { userID: number }) => {
    const [bookSetData, setBookSetData] = useState<BookSetRequest>({
        id: 0, // id of the set
        title: '', // name of the set
        header: {
            createdBy: 1, // id of the user who created the set
            createdAt: '', // current date in ISO 8601 format
        },
        books: [],
    });
    const dispatch = useDispatch();

    const handleModal = () => {
        dispatch(openModal('addBookset'));
    };
    const [
        createBookSet,
        { isLoading, isError: AddError, error, isSuccess: AddSuccess },
    ] = useCreateBookSetMutation();

    const {
        data: booksets,
        isError,
        isSuccess,
        refetch,
    } = useGetBookSetQuery();

    if (isError) {
        return <p>Произошла ошибка при загрузке данных.</p>;
    }

    if (!isSuccess) {
        return <p>Загрузка...</p>;
    }

    if (booksets && booksets.length === 0) {
        return <p>Нет доступных книжек в каталоге.</p>;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await createBookSet(bookSetData).unwrap();

            setBookSetData({
                id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1,
                title: '',
                header: {
                    createdBy: userID,
                    createdAt: new Date().toISOString(),
                },
                books: [],
            });
        } catch (err) {
            console.error('Ошибка при создании набора книг:', err);
        }
    };

    return (
        <div className={style.container}>
            <button onClick={handleModal}>ADD NEW BOOKSET</button>
            {booksets &&
                booksets.map(sets => (
                    <SwiperList
                        key={sets.id}
                        name={sets.title}
                        bookset={sets.books}
                        id={sets.id}
                    />
                ))}
            <GenericModal modalName={'addBookset'}>
                <div>МОДАЛКА СО ВСЕМИ КНИГАМИ</div>
                <p>наверное на книгах надо будет проставить плюсики для добавления в массив</p>
                <input type="text" placeholder='Назва набору'/>
                <button>СТВОРИТИ НАБІР</button>
            </GenericModal>
        </div>
    );
};

export default Booksset;
