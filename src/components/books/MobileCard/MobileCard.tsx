'use client';

import { useState } from 'react';

import Link from 'next/link';

import styles from './MobileCard.module.css';
import FavoriteBtn from '@/components/Favorite/FavoriteBtn';
import { Icon } from '@/components/common/Icon';
import { openModal, useDispatch } from '@/lib/redux';

const MobileCard = ({ book }: { book: any }) => {
    const [addClick, setAddClick] = useState(false);

    const dispatch = useDispatch();

    const handleOpenModal = (modalName: string) => {
        dispatch(openModal(modalName));
        setAddClick(true);
    };
    return (
        <>
            <div className={`${styles.wrapper} ${styles.styledWrapper}`}>
                <div
                    className={styles.imageContainer}
                    style={{
                        ['--background-image' as string]: `url(${book.url})`,
                    }}
                >
                    <Link href={`book/${book.id}`}></Link>
                </div>
                <div className={styles.contentContainer}>
                    <h3 className={styles.title}>
                        <Link href={`book/${book.id}`}>{book.title}</Link>
                    </h3>

                    <p className={styles.authorsList}>{book.authors}</p>
                    <div className={styles.bottomContainer}>
                        <p className={styles.price}>{book.price} ₴</p>
                        <div className={styles.controls}>
                            <FavoriteBtn book={book} />
                            <button
                                className={styles.cartButton}
                                onClick={() => {
                                    handleOpenModal('successInfo');
                                }}
                            >
                                <Icon name="cart" size={24} color="#fff" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MobileCard;
