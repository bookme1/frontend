'use client';

import styles from './Card.module.css';
import { IBook } from '@/app/book/[id]/page.types';
import FavoriteBtn from '@/components/Favorite/FavoriteBtn';
import { useDispatch } from '@/lib/redux';
import { openModal } from '@/lib/redux';
import { BookType } from '@/lib/redux/features/user/types';

import { Icon } from '../Icon';

interface CardProps {
    book: IBook;
}

const Card = ({ book }: CardProps) => {
    const { title, url, price, author, id } = book;
    const dispatch = useDispatch();
    const token =
        typeof window !== 'undefined'
            ? localStorage.getItem('accessToken')
            : null;

    const handleAddBook = () => {
        if (!token || !id) {
            alert('Користувач не авторизований');
            return;
        }

        dispatch(openModal('successInfo'));
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
                <div
                    className={`${styles.bookFormatContainer} ${styles.desktopFavorite}`}
                >
                    <FavoriteBtn book={book} />
                </div>
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
