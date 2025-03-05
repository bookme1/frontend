'use client';

import { useState } from 'react';

import styles from './BooksPage.module.css';
import { ModalAddBook } from '@/components/Modaladdbook';
import { ModalDelete } from '@/components/Modaldelete';
import { Webstatistics } from '@/components/Webstatistics';
import { Icon } from '@/components/common/Icon';
import { IUser, Role } from '@/lib/redux/features/user/types';

interface BooksPageProps {
    user: IUser | null;
}

const BooksPage: React.FC<BooksPageProps> = ({ user }) => {
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);

    if (user?.role != Role.Moderator && user?.role != Role.Admin)
        return <div>Доступ закритий.</div>;

    return (
        <>
            <div className={styles.container}>
                <Webstatistics />
                <div className={styles.card}>
                    <div className={styles.headerContainer}>
                        <div className={styles.searchInputWrapper}>
                            <input
                                type="text"
                                placeholder="Пошук"
                                className={styles.searchInput}
                            />
                            <Icon name="search" className={styles.searchIcon} />
                        </div>
                        <div className={styles.buttonGroup}>
                            <button
                                className={`${styles.button} ${styles.buttonLeft}`}
                            >
                                Книги
                            </button>
                            <button
                                className={`${styles.button} ${styles.buttonRight}`}
                            >
                                Набори
                            </button>
                        </div>
                        <div className={styles.info}>
                            <p>
                                Всього: <span className="font-bold">9999</span>
                            </p>
                            <button
                                className={styles.addBookButton}
                                onClick={() => setShowModal(true)}
                            >
                                Додати книгу
                            </button>
                        </div>
                    </div>

                    <div className={styles.tableHeader}>
                        <p>Назва</p>
                        <p className={styles.genreText}>Жанр</p>
                        <p>Артикул</p>
                        <p>Ціна</p>
                    </div>

                    <hr className={styles.hrLine} />

                    <div className={styles.flexColumnContainer}>
                        {[...Array(6)].map((_, idx) => (
                            <div className={styles.tableRow} key={idx}>
                                <p>Назва книги</p>
                                <p>Жанр</p>
                                <p>Артикул</p>
                                <p>Ціна</p>
                                <div className={styles.tableRowButtons}>
                                    <button>
                                        <Icon name="edit" size={34} />
                                    </button>
                                    <button onClick={() => setShowModal2(true)}>
                                        <Icon name="delete" size={34} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <ModalAddBook
                isVisible={showModal}
                onClose={() => setShowModal(false)}
            />
            <ModalDelete
                isVisible={showModal2}
                onClose={() => setShowModal2(false)}
            />
        </>
    );
};

export default BooksPage;
