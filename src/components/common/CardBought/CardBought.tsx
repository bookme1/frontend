'use client';

import Link from 'next/link';

import styles from './CardBought.module.css';
import { IBook } from '@/app/book/[id]/page.types';

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
