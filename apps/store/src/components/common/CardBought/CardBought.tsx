'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';


import styles from './CardBought.module.css';

import { IBook } from '../../../app/book/[id]/page.types';

import {handleDownload} from '../../../../../shared/downloadBook'
import { useRouter } from 'next/navigation';

const CardBought = ({
    book,
    epubLink,
    pdfLink,
    mobiLink,
}: {
    book: IBook | undefined;
    epubLink: string | undefined;
    pdfLink: string | undefined;
    mobiLink: string | undefined;
}) => {
    const isActive = epubLink || pdfLink || mobiLink;
    let initialBook;
    if (!book)
        initialBook = { title: '1', url: '1', price: 0, author: '1', id: '1' };
    else initialBook = book;

    const { title, url, author, id } = initialBook;

    const [isChecked, setIsChecked] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const savedState = localStorage.getItem('booksOffline');
        if (savedState) {
            try {
                const parsedState = JSON.parse(savedState);
                if (Array.isArray(parsedState)) {
                    setIsChecked(parsedState.includes(id));
                }
            } catch (error) {
                console.error('Ошибка парсинга localStorage:', error);
                localStorage.removeItem('booksOffline');
            }
        }
    }, [id]);

    const handleChange = (epubLink: string) => {
        const savedState = localStorage.getItem('booksOffline');
        let selectedBooks: string[] = savedState ? JSON.parse(savedState) : [];

        if (isChecked) {
            selectedBooks = selectedBooks.filter(bookId => bookId !== id);
        } else {
            selectedBooks.push(id);
        }

        setIsChecked(!isChecked);
        localStorage.setItem('booksOffline', JSON.stringify(selectedBooks));

        handleDownload(id, epubLink);
        router.replace(`http://localhost:3002/?q=${id}`);
    };

    return (
        <>
            <li
                className={`${styles.cardItem} ${!isActive && styles.cardDisabled}`}
            >
                <div
                    className={`${styles.lazyload} ${styles.imageContainer}`}
                    style={{ ['--background-image' as string]: `url(${url})` }}
                >
                    <Link
                        className={styles.cardLink}
                        href={`/book/${id}`}
                    ></Link>
                </div>
                <div className={styles.descriptionCotainer}>
                    {epubLink && (
                        <div className={styles.readOfflineBox}>
                            <input
                                type="checkbox"
                                id={id}
                                checked={isChecked}
                                onChange={() => handleChange(epubLink)}
                            />
                            <label
                                htmlFor={id}
                                className={styles.readOfflineLabel}
                            >
                                Доступ <br />
                                off-line
                            </label>
                        </div>
                    )}
                    <p className={styles.title}>
                        <Link className={styles.cardLink} href={`/book/${id}`}>
                            {title}
                        </Link>
                    </p>
                    <p className={styles.authors}>{author}</p>

                    {isActive && <p className={styles.price}>Скачати</p>}

                    {!isActive && (
                        <p className={styles.price}>
                            Книга генерується. Будь ласка, зачекайте...
                        </p>
                    )}
                    <div className={styles.bottomContainer}>
                        <div className={styles.boxStyles}>
                            {mobiLink && (
                                <a className={styles.bookLink} href={mobiLink}>
                                    mobi
                                </a>
                            )}
                            {pdfLink && (
                                <a className={styles.bookLink} href={pdfLink}>
                                    pdf
                                </a>
                            )}
                            {epubLink && (
                                <a className={styles.bookLink} href={epubLink}>
                                    epub
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </li>
        </>
    );
};

export default CardBought;
