'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { FaPause } from 'react-icons/fa6';

import styles from './BookUpdatePage.module.css';
import { useBookService } from '@/api/book/bookService';
import { Webstatistics } from '@/components/Webstatistics';
import { IUser, Role } from '@/lib/redux/features/user/types';

interface RequestResponseTemplate {
    status: number;
    message: string;
    error?: string;
    updated?: number;
}

interface BookUpdatePageProps {
    user: IUser | null;
}

const BookUpdatePage: React.FC<BookUpdatePageProps> = ({ user }) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [shouldStop, setShouldStop] = useState(false);
    const [requestsMade, setRequestsMade] = useState<number>(0);
    const [isRefilled, setIsRefilled] = useState(false);
    const [booksUpdated, setBooksUpdated] = useState<number>(0);
    const [responsesMarkup, setResponsesMarkup] = useState<
        RequestResponseTemplate[]
    >([]);

    const { refillQueue, updateBooksFromServer } = useBookService();

    // Используем useRef для отслеживания актуальных значений
    const isUpdatingRef = useRef(isUpdating);
    const shouldStopRef = useRef(shouldStop);

    // Обновляем рефы при изменении состояния
    useEffect(() => {
        isUpdatingRef.current = isUpdating;
    }, [isUpdating]);

    useEffect(() => {
        shouldStopRef.current = shouldStop;
    }, [shouldStop]);

    // API functions
    // const refillQueue = useCallback(async () => {
    //     return await bookService.refillQueue();
    // }, []);

    const updateBooksChunk = useCallback(async () => {
        return await updateBooksFromServer();
    }, []);

    // Main update function

    const runUpdatingBooks = useCallback(async () => {
        if (!isRefilled) {
            const res = await refillQueue();
            setIsRefilled(true);
            setRequestsMade(prev => prev + 1);
            setResponsesMarkup(prev => [...prev, res.data]);
        }

        while (!shouldStopRef.current && isUpdatingRef.current) {
            const res = await updateBooksChunk();
            console.log(res);
            setRequestsMade(prev => prev + 1);
            setResponsesMarkup(prev => [...prev, res.data]);

            if (res.data.updated < 30) {
                setIsUpdating(false);
                break;
            }

            setBooksUpdated(prev => prev + Number(res.data.updated));
        }
    }, [
        isRefilled,
        refillQueue,
        setRequestsMade,
        setResponsesMarkup,
        isUpdatingRef, // оставляем `isUpdatingRef`, так как он может влиять на процесс
        updateBooksChunk,
        setIsUpdating,
        setBooksUpdated,
    ]);

    useEffect(() => {
        if (isUpdating) {
            runUpdatingBooks();
        }
    }, [isUpdating, runUpdatingBooks]); // Теперь runUpdatingBooks стабилен

    if (user?.role != Role.Moderator && user?.role != Role.Admin)
        return <div>Доступ закритий.</div>;

    // Mocked responses (for testing)
    // const responsesMarkup = [
    //     { status: 201, message: 'Refill Successfull' },
    //     { status: 201, message: 'Update Successfull', updated: 30 },
    //     { status: 201, message: 'Update Successfull', updated: 30 },
    //     {
    //         status: 409,
    //         message: 'Update failed',
    //         error: 'PROTOCOL is not found',
    //     },
    //     { status: 201, message: 'Update Successfull', updated: 30 },
    //     { status: 201, message: 'Update Successfull', updated: 30 },
    //     { status: 201, message: 'Update Successfull', updated: 17 },
    // ];

    const generateBooksMarkup = () => {
        if (!responsesMarkup.length) return;
        console.log('responses');
        console.log(responsesMarkup);

        let itemBackground = '#006A4E';
        var d = new Date(),
            dformat =
                [d.getMonth() + 1, d.getDate(), d.getFullYear()].join('/') +
                ' ' +
                [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
        return responsesMarkup.map((response, index) => {
            if (!response) return;

            if (response.status >= 200 && response.status < 300) {
                if (!response.updated) itemBackground = '#097969';
                else itemBackground = '#006A4E';
            } else itemBackground = '#C41E3A';

            return (
                <li
                    key={index}
                    style={{
                        color: 'white',
                        backgroundColor: itemBackground,
                        padding: '2px 5px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '1px solid white',
                    }}
                >
                    <span>{dformat}</span>
                    <span>{response.status}</span>
                    <span>{response.message}</span>
                    <span>{response.updated || response.error}</span>
                </li>
            );
        });
    };

    return (
        <>
            <div className={styles.container}>
                <Webstatistics />
                <div className={styles.card}>
                    <div className={styles.header}>
                        <div className={styles.infoBlock}>
                            <p className={styles.infoText}>
                                Синхронізація книжок з Elibri
                            </p>
                            <p className={styles.infoTextSmall}>
                                Всього запитів: <span>{requestsMade}</span>
                            </p>
                            <p className={styles.infoTextSmall}>
                                Всього книжок оновлено:
                                <span>{booksUpdated}</span>
                            </p>
                        </div>
                        <div className={styles.buttonContainer}>
                            <button
                                className={styles.button}
                                onClick={() => setIsUpdating(prev => !prev)}
                            >
                                {!isUpdating ? (
                                    <span className={styles.buttonText}>
                                        Запуск <FaPlay />
                                    </span>
                                ) : (
                                    <span className={styles.buttonText}>
                                        Пауза <FaPause />
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                    <ul className={styles.bookList}>{generateBooksMarkup()}</ul>
                </div>
            </div>
        </>
    );
};

export default BookUpdatePage;
