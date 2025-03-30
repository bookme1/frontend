'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

import styles from './MainInformation.module.css';
import { useBookService } from '@/api/book/bookService';
import { IBook } from '@/app/book/[id]/page.types';
import FavoriteBtn from '@/components/Favorite/FavoriteBtn';
import Notify from '@/components/Notify/Notify';
import { NotificationState } from '@/components/Notify/NotifyType';
import { Icon } from '@/components/common/Icon';
import { useWindowSize } from '@/hooks/useWindowSize';
import { openModal } from '@/lib/redux';
import {
    useAddCartMutation,
    useGetCartQuantityQuery,
    useGetCartQuery,
} from '@/lib/redux/features/book/bookApi';
import { BookType } from '@/lib/redux/features/user/types';

import { Characteristics } from '../Characteristics';
import { ICharacteristics } from '../Characteristics/Characteristics.types';
import { Formats } from '../Formats';

const MainInformation = ({
    book,
    characteristics,
    isAuthorized,
}: {
    book: IBook;
    characteristics: ICharacteristics;
    isAuthorized: boolean;
}) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const checkedFormats = ['pdf', 'mobi', 'epub'];
    const formatsToWatermark: string[] = [];
    const { makeTestCheckout, makeCartCheckout, makeWatermarking, makeOrder } =
        useBookService();

    const { data: cartQuantity, refetch: refetchCartQuantity } =
        useGetCartQuantityQuery({
            type: BookType.Cart,
        });

    const { data: cart } = useGetCartQuery({ type: BookType.Cart });

    const isInCart = cart?.some(cartItem => cartItem.id === book.id);
    const isBuyBtnVisible = isInCart === undefined ? true : isInCart;

    const [notification, setNotification] = useState<NotificationState>({
        isVisible: false,
        text: '',
        type: 'information',
    });

    const updateNotification = (newValues: Partial<typeof notification>) => {
        setNotification(prev => ({ ...prev, ...newValues }));
    };

    const router = usePathname();
    const id = router?.split('/').pop();

    useEffect(() => {
        if (book?.url) {
            setImageLoaded(true);
        }
    }, [book?.url]);

    const [addCart] = useAddCartMutation();

    const handleAddBook = async () => {
        if (!isAuthorized) {
            updateNotification({
                isVisible: true,
                text: 'Для додавання у кошик, спочатку потрібно увійти в аккаунт',
                type: 'error',
            });
            return;
        }
        if (notification.isVisible) {
            setNotification(prev => ({ ...prev, isVisible: false }));
        }
        try {
            await addCart({
                bookId: book.id,
                type: BookType.Cart,
            });

            updateNotification({
                isVisible: true,
                text: 'Книга успішно додана до кошика!',
                type: 'success',
            });
        } catch (error) {
            console.error(`Failed to add book to cart. ${error}`);
            updateNotification({
                isVisible: true,
                text: `Помилка при додаванні книги до кошика. Помилка #2001`,
                type: 'error',
            });
        }
    };

    const handleCheckout = async () => {
        refetchCartQuantity();
        if (checkedFormats.length === 0) {
            updateNotification({
                isVisible: true,
                text: `Оберіть формати книг, які ви хочете придбати!`,
                type: 'error',
            });
            return;
        }
        if (!isAuthorized) {
            updateNotification({
                isVisible: true,
                text: `Щоб отримати необмежений доступ до книги (і користуватись нашим рідером) будь ласка, увійдіть в акаунт!`,
                type: 'error',
            });
            return;
        }
        const order_id = uuidv4();

        makeTestCheckout(book.price, order_id, updateNotification);

        await makeOrder([book.id], order_id); // Create order object + prepare file
        // const transaction_id = await makeWatermarking(
        //     formatsToWatermark.join(','),
        //     book.referenceNumber,
        //     order_id
        // );
        // if (transaction_id) {
        // } else {
        //     updateNotification({
        //         isVisible: true,
        //         text: `Помилка при нанесенні вотермарки!`,
        //         type: 'error',
        //     });
        //     updateNotification({
        //         isVisible: true,
        //         text: `Будь ласка, зв'яжіться з адміністратором сайту!`,
        //         type: 'error',
        //     });
        // }
    };

    const availableFormats = [false, false, false];

    if (book.formatMobi) {
        availableFormats[1] = true;
        formatsToWatermark.push('mobi');
    }
    if (book.formatPdf) {
        availableFormats[0] = true;
        formatsToWatermark.push('pdf');
    }
    if (book.formatEpub) {
        availableFormats[2] = true;
        formatsToWatermark.push('epub');
    }

    const screenWidth = useWindowSize().width;

    const getAuthorsMarkup = (authors: string) => {
        if (authors === undefined) return;
        const authorsArr = authors.split(',');
        return authorsArr.map(author => (
            <li className={styles.author} key={author}>
                {author}
            </li>
        ));
    };

    const authorsMarkup = getAuthorsMarkup(book.author);
    return (
        <div className={styles.container}>
            <div className={`${styles.wrapper} ${styles.styledWrapper}`}>
                <div className={styles.imgContainer}>
                    {imageLoaded && book?.url && (
                        <Image
                            className={styles.image}
                            src={
                                book.url.startsWith('http')
                                    ? book.url
                                    : `/${book.url}`
                            }
                            alt={book.title}
                            width={250}
                            height={330}
                        />
                    )}
                </div>
                <div className={styles.infoContainer}>
                    <div className={styles.mainInfoContainer}>
                        <h1 className={styles.title}>{book?.title}</h1>
                        <ul className={styles.authorsList}>{authorsMarkup}</ul>
                        <p className={styles.price}>{book?.price} ₴</p>
                        {notification.isVisible && (
                            <Notify
                                text={notification.text}
                                duration={5}
                                type={notification.type}
                            />
                        )}
                        {isBuyBtnVisible ? (
                            <div className={styles.controls}>
                                <button
                                    className={styles.toCardBtn}
                                    onClick={() => {
                                        openModal('cart');
                                        handleAddBook();
                                        refetchCartQuantity();
                                    }}
                                >
                                    <Icon name="cart" size={28} />В кошик
                                </button>
                                <button
                                    className={styles.toCardBtn}
                                    onClick={handleCheckout}
                                >
                                    Купити зараз
                                </button>
                                <button className={styles.toFavBnt}>
                                    <FavoriteBtn book={book} />
                                </button>
                            </div>
                        ) : (
                            <div>Ви вже купили цю книгу.</div>
                        )}
                        <Formats
                            // setChecked={setCheckedFormats}
                            pdf={availableFormats[0]}
                            mobi={availableFormats[1]}
                            epub={availableFormats[2]}
                        />
                    </div>
                    {screenWidth &&
                        (screenWidth < 768 || screenWidth >= 1280) && (
                            <Characteristics
                                characteristics={characteristics}
                            />
                        )}
                </div>
            </div>
            {screenWidth && screenWidth >= 768 && screenWidth < 1280 && (
                <div className={styles.wrapper}>
                    <Characteristics characteristics={characteristics} />
                </div>
            )}
        </div>
    );
};

export default MainInformation;
