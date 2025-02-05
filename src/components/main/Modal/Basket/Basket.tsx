import React, { useState } from 'react';
import { GoTrash } from 'react-icons/go';

import Image from 'next/image';

import styles from './Basket.module.css';
import { bookService } from '@/api/book/bookService';
import emptyBasket from '@/assets/modal/empty_basket.svg';
import { NotificationState } from '@/components/Notify/NotifyType';
import { setModalStatus, useDispatch, useSelector } from '@/lib/redux';
import { useGetFavoritesQuery } from '@/lib/redux/features/book/bookApi';
import { useCreateOrderMutation } from '@/lib/redux/features/order/orderApi';
import { selectOrders } from '@/lib/redux/features/order/orderSlice';
import { CreateOrderDTOExtended } from '@/lib/redux/features/order/types';
import { BookType } from '@/lib/redux/features/user/types';
import { useRemoveBookMutation } from '@/lib/redux/features/user/userApi';

interface IBook {
    id: string;
    title: string;
    author: string;
    price: string; // Залишаємо як string
    url: string;
}

const Basket: React.FC = () => {
    // const [books, setBooks] = useState<IBook[]>([]);
    const dispatch = useDispatch();

    const [removeBook] = useRemoveBookMutation();

    // const [createOrder, { isLoading:isLoadingOrder, isError, isSuccess }] = useCreateOrderMutation();
    // const [orderData, setOrderData] = useState<CreateOrderDTOExtended>({
    //     order_id: '12345',
    //     orderBooks: orders,
    //     user: 123 ,
    //     amount: 49.99,
    // });

    // const handleCreateOrder =async()=>{
    //     try {
    //         await createOrder(orderData).unwrap();
    //         console.log('Order created successfully');
    //     } catch (error) {
    //         console.error('Failed to create order:', error);
    //     }
    // }

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
        error,
        isLoading,
    } = useGetFavoritesQuery({
        type: BookType.Cart,
    });

    const cartSum = cart?.cart.reduce(
        (total, book) => total + Number(book.price),
        0
    );

    const handleCheckout = async () => {
        const accessToken = localStorage.getItem('accessToken');

        // Close modal, in order not to mix z-indexes
        dispatch(setModalStatus(false));

        const data = await bookService.makeCartCheckout(
            accessToken || '',
            updateNotification
        );

        const watermarking_response = await bookService.makeCartWatermarking(
            data.order_id
        );
        if (Array.isArray(watermarking_response)) {
            console.log('transaction successful');
        } else {
            updateNotification({
                isVisible: true,
                text: `Помилка при нанесенні вотермарки! Будь ласка, зв&apos;яжіться з адміністратором сайту`,
                type: 'error',
            });
        }
    };

    return (
        <div className={styles.container}>
            <span className={`${styles.text} ${styles.title}`}>Кошик</span>
            {!cart?.cart.length ? (
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
                        {cart &&
                            cart.cart.map(book => (
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
                                            {book.price}
                                        </p>
                                    </div>
                                    <GoTrash
                                        className={styles.goTrash}
                                        onClick={() => {
                                            removeBook({
                                                type: BookType.Cart,
                                                bookId: book.id,
                                            });
                                        }}
                                    />
                                </li>
                            ))}
                    </ul>
                    <div className={styles.footerBox}>
                        <div className={styles.textBox}>
                            <p className={styles.text}>Всього:</p>
                            <p className={styles.text}>{cartSum} &#x20B4;</p>
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
        </div>
    );
};

export default Basket;
