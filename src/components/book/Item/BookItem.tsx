import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import styles from './BookItem.module.css';
import FavoriteBtn from '@/components/Favorite/FavoriteBtn';
import Notify from '@/components/Notify/Notify';
import { NotificationState } from '@/components/Notify/NotifyType';
import { Icon } from '@/components/common/Icon';
import {
    useAddCartMutation,
    useGetCartQuantityQuery,
} from '@/lib/redux/features/book/bookApi';
import { BookType } from '@/lib/redux/features/user/types';

const BookItem = ({
    isSwiper,
    book,
    handleOpenModal,
    isPlusVisible,
    handleAddToBooksetList,
    user,
}: any) => {
    const [addCard] = useAddCartMutation();

    const [notification, setNotification] = useState<NotificationState>({
        isVisible: false,
        text: '',
        type: 'information',
    });

    const updateNotification = (newValues: Partial<typeof notification>) => {
        setNotification(prev => ({ ...prev, ...newValues }));
    };

    const handleAddToOrder = async () => {
        if (!user) {
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
            await addCard({
                bookId: book.id,
                type: BookType.Cart,
            });
            refetchCartQuantity();
            updateNotification({
                isVisible: true,
                text: 'Книга успішно додана у кошик',
                type: 'success',
            });
        } catch (error) {
            console.error(`Failed to add book to cart. ${error}`);
            updateNotification({
                isVisible: true,
                text: 'Failed to add book to cart.',
                type: 'error',
            });
        }
    };

    const { data: cartQuantity, refetch: refetchCartQuantity } =
        useGetCartQuantityQuery({
            type: BookType.Cart,
        });

    return (
        <>
            <li
                key={book.id}
                className={`${styles.item} ${isSwiper ? styles.swiper : styles.notSwiper}`}
            >
                {isPlusVisible && (
                    <button
                        onClick={() => handleAddToBooksetList(book.id)}
                        className={styles.addBooksetBtn}
                    >
                        Add to bookset
                    </button>
                )}
                <Link
                    href={`/book/${book.id}`}
                    className={` ${isSwiper ? styles.swiper : styles.notSwiper}`}
                >
                    <Image
                        src={book.url}
                        alt={book.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className={`${styles.img}`}
                        priority={true}
                        style={{
                            objectFit: 'cover',
                        }}
                    />
                </Link>
                <div
                    className={`${styles.wrapper}  ${isSwiper ? styles.swiper : styles.notSwiper}`}
                >
                    <div className={styles.information}>
                        <p className={styles.title}>{book.title}</p>
                        <p className={styles.author}>
                            {book.author || 'Немає автора'}
                        </p>
                    </div>
                    {notification.isVisible && (
                        <Notify
                            text={notification.text}
                            duration={5}
                            type={notification.type}
                        />
                    )}
                    <div className={styles.functionality}>
                        <span>{book.price} ₴</span>
                        <div className={styles.button}>
                            <FavoriteBtn book={book} />
                            <button
                                aria-label="Корзина"
                                className={styles.basket}
                                onClick={e => {
                                    // handleOpenModal('successInfo', e, book);
                                    handleAddToOrder();
                                }}
                            >
                                <Icon name="basket" size={24} color="#fff" />
                            </button>
                        </div>
                    </div>
                </div>
            </li>
        </>
    );
};

export default BookItem;
