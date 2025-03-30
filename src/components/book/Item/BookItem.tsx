import { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

import styles from './BookItem.module.css';
import loaderData from './loader.json';
import FavoriteBtn from '@/components/Favorite/FavoriteBtn';
import Notify from '@/components/Notify/Notify';
import { NotificationState } from '@/components/Notify/NotifyType';
import { Icon } from '@/components/common/Icon';
import {
    useAddCartMutation,
    useGetCartQuantityQuery,
    useGetCartQuery,
} from '@/lib/redux/features/book/bookApi';
import { BookType } from '@/lib/redux/features/user/types';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const BookItem = ({
    isSwiper,
    book,
    handleOpenModal,
    isPlusVisible,
    handleAddToBooksetList,
    user,
}: any) => {
    const [isLoading, setIsLoading] = useState(false);
    const [bookAdded, setBookAdded] = useState(false);
    const [addCard] = useAddCartMutation();

    const [notification, setNotification] = useState<NotificationState>({
        isVisible: false,
        text: '',
        type: 'information',
        duration: 3,
    });

        const {

            refetch: refetchGetCats,
        } = useGetCartQuery({
            type: BookType.Cart,
        });

    useEffect(() => {
        if (notification.isVisible) {
            const timer = setTimeout(
                () => {
                    setNotification(prev => ({ ...prev, isVisible: false }));
                },
                (notification.duration ?? 3) * 1000
            );

            return () => clearTimeout(timer);
        }
    }, [notification.isVisible, notification.duration]);

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
            refetchGetCats();
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

    const imageLoader = () => {
        return 'loading...';
    };

    return (
        <>
            <li
                key={book.id}
                className={`${styles.item} ${isSwiper ? styles.swiper : styles.notSwiper}`}
            >
                <div
                    className={
                        isLoading ? styles.loading : styles.visuallyHidden
                    }
                >
                    <Lottie animationData={loaderData} loop={true} />
                </div>
                {isPlusVisible && (
                    <button
                        onClick={() => {
                            handleAddToBooksetList(book.id);
                            setBookAdded(!bookAdded);
                        }}
                        className={`${styles.addBooksetBtn} ${bookAdded ? styles.added : ''}`}
                    >
                        Add to bookset
                    </button>
                )}
                <Link
                    href={`/book/${book.id}`}
                    className={` ${isSwiper ? styles.swiper : styles.notSwiper}`}
                    onClick={() => setIsLoading(true)}
                >
                    <div className={styles.imgContainer}>
                        <Image
                            src={book.url}
                            alt={book.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className={`${styles.img}`}
                            priority={true}
                            style={{
                                objectFit: 'contain',
                            }}
                            blurDataURL="blur"
                        />
                    </div>
                </Link>
                {notification.isVisible && (
                    <div style={{ marginTop: '50%', transform:'translateY(-70%)' }}>
                        <Notify
                            text={notification.text}
                            duration={5}
                            type={notification.type}
                        />
                    </div>
                )}
                <div
                    className={`${styles.wrapper}  ${isSwiper ? styles.swiper : styles.notSwiper}`}
                >
                    {!notification.isVisible && (
                        <>
                            <div className={styles.information}>
                                <p className={styles.title}>{book.title}</p>
                                <p className={styles.author}>
                                    {book.author || 'Немає автора'}
                                </p>
                            </div>

                            <div className={styles.functionality}>
                                <span className={styles.price}>
                                    {book.price} ₴
                                </span>
                                <div className={styles.button}>
                                    <FavoriteBtn book={book} />
                                    <button
                                        aria-label="Корзина"
                                        className={styles.basket}
                                        onClick={e => {
                                            handleAddToOrder();
                                        }}
                                    >
                                        <Icon
                                            name="basket"
                                            size={24}
                                            color="#fff"
                                        />
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </li>
        </>
    );
};

export default BookItem;
