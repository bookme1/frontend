import React, { useEffect, useMemo, useState } from 'react';
import { GoTrash } from 'react-icons/go';

import Image from 'next/image';

import styles from './Basket.module.css';
import { useBookService } from '@/api/book/bookService';
import emptyBasket from '@/assets/modal/empty_basket.svg';
import Notify from '@/components/Notify/Notify';
import { NotificationState } from '@/components/Notify/NotifyType';
import { setModalStatus, useDispatch } from '@/lib/redux';
import {
    useGetCartQuantityQuery,
    useGetCartQuery,
} from '@/lib/redux/features/book/bookApi';
import { BookType } from '@/lib/redux/features/user/types';
import { useRemoveBookMutation } from '@/lib/redux/features/user/userApi';

interface IBook {
    id: string;
    title: string;
    author: string;
    price: string | number;
    url: string;
}

const Basket: React.FC = () => {
    const dispatch = useDispatch();

    const [orderedBooks, setOrderedBooks] = useState<IBook[]>([]);

    const [removeBook] = useRemoveBookMutation();

    const [notification, setNotification] = useState<NotificationState>({
        isVisible: false,
        text: '',
        type: 'information',
    });

    const updateNotification = (newValues: Partial<typeof notification>) => {
        setNotification(prev => ({ ...prev, ...newValues }));
    };

    const {
        data: cart,
        isLoading,
        refetch: refetchGetCats,
    } = useGetCartQuery({
        type: BookType.Cart,
    });

    const { refetch: refetchCartQuantity } = useGetCartQuantityQuery({
        type: BookType.Cart,
    });

    const {
        makeCartCheckout,
        makeCartWatermarking,
        makeCartCheckoutWithRetry,
    } = useBookService();

    useEffect(() => {
        if (Array.isArray(cart)) {
            setOrderedBooks(cart);
        }
    }, [cart]);

    const totalPrice = useMemo(() => {
        return orderedBooks.reduce((total, book) => {
            const price =
                typeof book.price === 'string'
                    ? parseFloat(book.price)
                    : book.price;
            return !isNaN(price) ? total + price : total;
        }, 0);
    }, [orderedBooks]);

    // const handleCheckout = async () => {
    //     dispatch(setModalStatus(false));

    //     const data = await makeCartCheckout(updateNotification);
    //     console.log(`data -${data}`);

    //     const watermarking_response = await makeCartWatermarking(data.order_id);

    //     console.log(`watermarking_response - ${watermarking_response}`);

    //     if (Array.isArray(watermarking_response)) {
    //         console.log('transaction successful');
    //     } else {
    //         updateNotification({
    //             isVisible: true,
    //             text: `Помилка при нанесенні вотермарки! Будь ласка, зв&apos;яжіться з адміністратором сайту`,
    //             type: 'error',
    //         });
    //     }
    // };

    const handleCheckout = async () => {
        dispatch(setModalStatus(false));

        try {
            const data = await makeCartCheckoutWithRetry(updateNotification);
            console.log(`data -${data}`);

            const watermarking_response = await makeCartWatermarking(
                data.order_id
            );

            console.log(`watermarking_response - ${watermarking_response}`);

            if (Array.isArray(watermarking_response)) {
                console.log('transaction successful');
            } else {
                updateNotification({
                    isVisible: true,
                    text: `Помилка при нанесенні вотермарки! Будь ласка, зв&apos;яжіться з адміністратором сайту`,
                    type: 'error',
                });
            }
        } catch (error) {
            // Здесь ошибка будет уже обработана в makeCartCheckoutWithRetry
            console.error('Error in checkout:', error);
        }
    };
    return (
        <div className={styles.container}>
            <span className={`${styles.text} ${styles.title}`}>Кошик</span>
            {isLoading ? (
                <div style={{ width: 370, margin: '0 auto' }}>
                    <p
                        style={{
                            marginTop: 31,
                            textAlign: 'center',
                            fontSize: 20,
                        }}
                    >
                        Немає жодної книги?
                    </p>
                    <Image
                        style={{ margin: '0 auto', marginTop: 24 }}
                        src={emptyBasket.src}
                        alt="A beautiful girl in red sweater with books"
                        width={322}
                        height={344}
                    />
                    <p
                        style={{
                            marginTop: 24,
                            textAlign: 'center',
                            fontSize: 18,
                        }}
                    >
                        Порожній кошик - твоя можливість для нових книжкових
                        відкриттів!
                    </p>
                    <button
                        className={styles.catalogBtn}
                        style={{ marginTop: 32, width: '100%' }}
                    >
                        До каталогу
                    </button>
                </div>
            ) : (
                <>
                    <ul className={styles.list}>
                        {Array.isArray(cart) &&
                            cart?.map((book: IBook) => (
                                <li className={styles.item} key={book.id}>
                                    <Image
                                        className={styles.img}
                                        src={book.url}
                                        alt={book.title}
                                        width={120}
                                        height={160}
                                        quality={75}
                                        style={{ objectFit: 'contain' }}
                                    />
                                    <div>
                                        <p className={styles.title}>
                                            {book.title}
                                        </p>
                                        <p className={styles.author}>
                                            {book.author}
                                        </p>
                                        <p className={styles.price}>
                                            {book.price} ₴
                                        </p>
                                    </div>

                                    <GoTrash
                                        className={styles.goTrash}
                                        onClick={async () => {
                                            try {
                                                await removeBook({
                                                    type: BookType.Cart,
                                                    bookId: book.id,
                                                }).unwrap();
                                                refetchGetCats();
                                                refetchCartQuantity();

                                                updateNotification({
                                                    isVisible: true,
                                                    text: 'Book removed successfully',
                                                    type: 'success',
                                                });
                                            } catch (error) {
                                                updateNotification({
                                                    isVisible: true,
                                                    text: 'Не вдалося видалити книгу. Спробуйте ще раз.',
                                                    type: 'error',
                                                });
                                            }
                                        }}
                                    />
                                </li>
                            ))}
                    </ul>
                    <div className={styles.footerBox}>
                        <div className={styles.textBox}>
                            <p className={styles.text}>Всього:</p>
                            <p className={styles.text}>{totalPrice} &#x20B4;</p>
                        </div>

                        <button
                            className={styles.cartBtn}
                            onClick={handleCheckout}
                        >
                            Оформити замовлення
                        </button>
                    </div>
                </>
            )}
            {notification.isVisible && (
                <Notify
                    text={notification.text}
                    duration={5}
                    type={notification.type}
                />
            )}
        </div>
    );
};

export default Basket;
