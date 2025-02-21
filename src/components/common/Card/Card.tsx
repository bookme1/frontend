'use client';

import { useState } from 'react';

import styles from './Card.module.css';
import { IBook } from '@/app/book/[id]/page.types';
import FavoriteBtn from '@/components/Favorite/FavoriteBtn';
import Notify from '@/components/Notify/Notify';
import { NotificationState } from '@/components/Notify/NotifyType';
import { useDispatch } from '@/lib/redux';
import { openModal } from '@/lib/redux';
import {
    useAddCartMutation,
    useGetCartQuantityQuery,
} from '@/lib/redux/features/book/bookApi';
import { BookType } from '@/lib/redux/features/user/types';
import { useGetDataMutation } from '@/lib/redux/features/user/userApi';

import { Icon } from '../Icon';

const Card: React.FC<{ book: IBook }> = ({ book }) => {
    const { title, url, price, author, id } = book;
    const dispatch = useDispatch();
    const [addCard] = useAddCartMutation();
    const { refetch: refetchCartQuantity } = useGetCartQuantityQuery({
        type: BookType.Cart,
    });

    const [trigger, { data: user, error, isLoading }] = useGetDataMutation();

    const [notification, setNotification] = useState<NotificationState>({
        isVisible: false,
        text: '',
        type: 'information',
    });

    const updateNotification = (newValues: Partial<typeof notification>) => {
        setNotification(prev => ({ ...prev, ...newValues }));
    };

    const handleAddBook = async () => {
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
        // dispatch(openModal('successInfo'));
    };

    return (
        <article className={styles.cardContainer}>
            <figure
                className={styles.imageContainer}
                style={{ backgroundImage: `url(${url})` }}
            >
                <a
                    href={`/book/${id}`}
                    aria-label={`Перейти до інформації про ${title}`}
                    className={styles.cardLink}
                ></a>
            </figure>
            <section className={styles.descriptionContainer}>
                <h2 className={styles.title}>
                    <a href={`/book/${id}`} className={styles.cardLink}>
                        {title}
                    </a>
                </h2>
                <p className={styles.authors}>{author}</p>
                {notification.isVisible && (
                    <Notify
                        text={notification.text}
                        duration={5}
                        type={notification.type}
                    />
                )}
                <div className={styles.bottomContainer}>
                    <p className={styles.price}>{price} ₴</p>
                    <div className={styles.controls}>
                        <div className={styles.mobileFavorite}>
                            <FavoriteBtn book={book} />
                        </div>
                        <button
                            className={styles.cartButton}
                            aria-label="Додати в кошик"
                            onClick={handleAddBook}
                        >
                            <Icon name="cart" size={24} color="white" />
                        </button>
                    </div>
                </div>
            </section>
        </article>
    );
};

export default Card;
