import Image from 'next/image';
import Link from 'next/link';

import styles from './BookItem.module.css';
import FavoriteBtn from '@/components/Favorite/FavoriteBtn';
import { Icon } from '@/components/common/Icon';

const BookItem = ({ book, handleOpenModal }: any) => {
    return (
        <li key={book.id} className={styles.products__item}>
            <Link href={`book/${book.id}`}>
                <Image
                    src={book.url}
                    alt={book.title}
                    width={230}
                    height={288}
                    className={styles.products__img}
                    loading="lazy"
                    style={{
                        objectFit: 'cover',
                        width: 'auto',
                        height: 'auto',
                    }}
                />
                <div className={styles.products__wrapper}>
                    <div className={styles.products__wrapper_information}>
                        <p className={styles.products__title}>{book.title}</p>
                        <p className={styles.products__author}>
                            {book.author !== '' ? book.author : 'Немає автора'}
                        </p>
                    </div>
                    <div className={styles.products__wrapper_functionality}>
                        <span>{book.price}</span>
                        <div className={styles.products__wrapper_button}>
                            <FavoriteBtn book={book} />
                            <button
                                aria-label="Корзина"
                                className={styles.button__basket}
                                onClick={e => handleOpenModal('successInfo', e)}
                            >
                                <Icon name="basket" size={24} color="#fff" />
                            </button>
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    );
};

export default BookItem;
