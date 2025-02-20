import Image from 'next/image';
import Link from 'next/link';

import styles from './BookItem.module.css';
import FavoriteBtn from '@/components/Favorite/FavoriteBtn';
import { Icon } from '@/components/common/Icon';

const BookItem = ({
    book,
    handleOpenModal,
    isPlusVisible,
    handleAddToBooksetList,
    
}: any) => {
    return (
        <li key={book.id} className={styles.item}>
            {isPlusVisible && (
                <button
                    onClick={() => handleAddToBooksetList(book)}
                    className={styles.addBooksetBtn}
                >
                    Add to bookset
                </button>
            )}
            <Link href={`/book/${book.id}`}>
                <Image
                    src={book.url}
                    alt={book.title}
                    width={230}
                    height={288}
                    className={styles.img}
                    loading="lazy"
                    style={{
                        objectFit: 'cover',
                        width: 'auto',
                        height: 'auto',
                    }}
                />
            </Link>
            <div className={styles.wrapper}>
                <div className={styles.information}>
                    <p className={styles.title}>{book.title}</p>
                    <p className={styles.author}>
                        {book.author || 'Немає автора'}
                    </p>
                </div>
                <div className={styles.functionality}>
                    <span>{book.price}</span>
                    <div className={styles.button}>
                        <FavoriteBtn book={book}  />
                        <button
                            aria-label="Корзина"
                            className={styles.basket}
                            onClick={e => handleOpenModal('successInfo', e)}
                        >
                            <Icon name="basket" size={24} color="#fff" />
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default BookItem;
