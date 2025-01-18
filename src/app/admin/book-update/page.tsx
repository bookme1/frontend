'use client';

import { useEffect, useRef, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { FaPause } from 'react-icons/fa6';

import { bookService } from '@/api/book/bookService';
import { Headerstatistics } from '@/components/Headerstatistics';
import { Loading } from '@/components/SERVICE_PAGES/Loading';
import { Webstatistics } from '@/components/Webstatistics';
import { Icon } from '@/components/common/Icon';
import useFetchUserData from '@/contexts/useFetchUserData';
import { IUser, Role } from '@/lib/redux/features/user/types';
import { getCookie } from '@/components/Cookie/Cookie';

interface RequestResponseTemplate {
    status: number;
    message: string;
    error?: string;
    updated?: number;
}

export default function Home() {
    const [isUpdating, setIsUpdating] = useState(false);
    const [shouldStop, setShouldStop] = useState(false);
    const [requestsMade, setRequestsMade] = useState<number>(0);
    const [isRefilled, setIsRefilled] = useState(false);
    const [booksUpdated, setBooksUpdated] = useState<number>(0);
    const [responsesMarkup, setResponsesMarkup] = useState<
        RequestResponseTemplate[]
    >([]);

    // Используем useRef для отслеживания актуальных значений
    const isUpdatingRef = useRef(isUpdating);
    const shouldStopRef = useRef(shouldStop);

    //User authorization
    const { userData, isLoading, fetchUserData } = useFetchUserData();
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedAccessToken = getCookie('accessToken');
            const storedRefreshToken = getCookie('refreshToken');
            fetchUserData(storedAccessToken, storedRefreshToken);
        }
    }, [fetchUserData]);

    // Обновляем рефы при изменении состояния
    useEffect(() => {
        isUpdatingRef.current = isUpdating;
    }, [isUpdating]);

    useEffect(() => {
        shouldStopRef.current = shouldStop;
    }, [shouldStop]);

    // Run the update when `isUpdating` changes
    useEffect(() => {
        if (isUpdating) {
            runUpdatingBooks();
        }
    }, [isUpdating]);

    if (isLoading) {
        return <Loading />;
    }

    if (userData?.role != Role.Moderator && userData?.role != Role.Admin)
        return <div>Доступ закритий.</div>;

    const data = userData as IUser;

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

    // API functions
    const refillQueue = async () => {
        return await bookService.refillQueue();
    };

    const updateBooksChunk = async () => {
        return await bookService.updateBooksFromServer();
    };

    // Main update function

    const runUpdatingBooks = async () => {
        if (!isRefilled) {
            const res = await refillQueue();
            setIsRefilled(true); // Set refill flag to true after the first refill
            setRequestsMade(prev => prev + 1);
            setResponsesMarkup(prev => [...prev, res.data]); // Обновляем состояние респонсов
        }

        while (!shouldStopRef.current && isUpdatingRef.current) {
            const res = await updateBooksChunk();
            console.log(res);
            setRequestsMade(prev => prev + 1);
            setResponsesMarkup(prev => [...prev, res.data]); // Добавляем новый респонс в массив

            // Check if all books have been updated
            if (res.data.updated < 30) {
                setIsUpdating(false); // Stop updating if queue is empty
                break;
            }

            setBooksUpdated(prev => prev + Number(res.data.updated));
        }
    };

    return (
        <>
            <Headerstatistics username={data.username} />
            <div className="flex mt-10 gap-16 ">
                <Webstatistics />
                <div className=" w-3/4 h-3/6 rounded-2xl  border-slate-900 shadow-2xl py-3 text-blue-900  ">
                    <div className="flex px-10 justify-between items-center">
                        <div className="flex gap-[40px] items-center">
                            <p className="text-xl">
                                Синхронізація книжок з Elibri
                            </p>
                            <p className="text-lg">
                                Всього запитів: <span>{requestsMade}</span>
                            </p>
                            <p className="text-lg">
                                Всього книжок оновлено:
                                <span>{booksUpdated}</span>
                            </p>
                        </div>
                        <div className="flex items-center gap-10">
                            <button
                                className=" border px-3 py-2 rounded-lg bg-blue-900 text-white"
                                onClick={() => setIsUpdating(prev => !prev)}
                            >
                                {!isUpdating && (
                                    <span className="flex gap-1 items-center">
                                        Запуск
                                        <FaPlay />
                                    </span>
                                )}
                                {isUpdating && (
                                    <span className="flex gap-1 items-center">
                                        Пауза <FaPause />
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                    <ul>{generateBooksMarkup()}</ul>
                </div>
            </div>
        </>
    );
}
