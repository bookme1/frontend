'use client';

import React, { useEffect, useRef, useState } from 'react';

import ePub, { Location, Rendition } from 'epubjs';
import { useSearchParams } from 'next/navigation';

import styles from './page.module.css';

import { handleDownload } from '../../../shared/downloadBook';
import { fetchUserData } from '../../../shared/fetchUserData';
import { getEpubFromIndexedDB } from '../../../shared/indexed-db-util';
import { IUser } from '../../../store/src/lib/redux/features/user/types';

const Page = () => {
    const viewerRef = useRef<HTMLDivElement>(null);
    const renditionRef = useRef<Rendition | null>(null);
    // const [book, setBook] = useState<Book | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const [showSettings, setShowSettings] = useState(false);
    const [fontSize, setFontSize] = useState<number>(18);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [fontFamily, setFontFamily] = useState<string>('serif');

    const [user, setUser] = useState<IUser | null>(null);
    const [orderedBooks, setOrderedBooks] = useState<any[] | null>(null);

    const searchParams = useSearchParams();
    const id = searchParams.get('q');

    const backendUrl = process.env.NEXT_PUBLIC_BASE_BACKEND_URL;
    const partOfLink = process.env.NEXT_PUBLIC_PART_OF_LINK;

    useEffect(() => {
        const getUserData = async () => {
            const data = await fetchUserData(backendUrl);
            if (data) {
                setUser(data);
            }
        };

        getUserData();
    }, [backendUrl]);

    useEffect(() => {
        if (user) {
            const orders = user.orders[0].orderBooks;
            setOrderedBooks(orders);
        }
    }, [backendUrl, user]);

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js').then(reg => {
                console.log('SW registered:', reg);
            });
        }
    }, []);

    useEffect(() => {
        const loadBook = async () => {
            if (!id) {
                console.warn('Ошибка: ID отсутствует в параметрах запроса');
                return;
            }
            const blob = await getEpubFromIndexedDB(id); //вставить id из адресной строки
            if (!blob) {
                console.warn('EPUB not found in IndexedDB');
                return;
            }
            const arrayBuffer = await blob.arrayBuffer();

            const book = ePub(arrayBuffer);
            // setBook(book);
            const rendition = book.renderTo(viewerRef.current!, {
                width: '100%',
                height: '100%',
            });

            rendition.themes.default({
                body: {
                    background: theme === 'dark' ? '#1e1e1e' : '#fff',
                    color: theme === 'dark' ? '#fff' : '#000',
                    fontFamily,
                    'font-size': `${fontSize}px !important`,
                },
            });

            rendition.display();
            renditionRef.current = rendition;

            rendition.on('relocated', (location: Location) => {
                const percentage = book.locations.percentageFromCfi(
                    location.start.cfi
                );
                setProgress(percentage);
                localStorage.setItem('reader-progress', percentage.toString());
            });

            book.ready.then(() => {
                book.locations.generate(1000).then(() => {
                    const savedProgress =
                        localStorage.getItem('reader-progress');
                    if (savedProgress) {
                        const loc = book.locations.cfiFromPercentage(
                            parseFloat(savedProgress)
                        );
                        rendition.display(loc);
                    }
                });
            });
        };

        loadBook();
        return () => renditionRef.current?.destroy();
    }, [theme, fontSize, fontFamily, id]);

    return (
        <div className={styles.readerContainer}>
            <div className={styles.header}>
                <div>
                    <button
                        className={styles.navButton}
                        onClick={() => renditionRef.current?.prev()}
                    >
                        Prev
                    </button>
                    <button
                        className={styles.navButton}
                        onClick={() => renditionRef.current?.next()}
                    >
                        Next
                    </button>
                </div>
                <div
                    style={{
                        display: 'flex',
              
                        gap: '20px',
                        justifyContent: 'center',
                    }}
                >
                    <button
                        style={{
                            width: '44px',
                            height: '44px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '1px 1px 6px 0px #00000026',
                            border: '1px solid #00000026',
                            borderRadius: '50%',
                         
                            cursor: 'pointer',
                        }}
                        onClick={() => {
                            window.location.href = `${backendUrl}/api/auth/signin/google`;
                        }}
                    >
                        Гугл-вход
                    </button>
                    <button
                        onClick={() => {
                            orderedBooks?.map(book => {
                                handleDownload(
                                    book?.book?.id,
                                    book?.epubLink,
                                    partOfLink
                                );
                            });
                        }}
                    >
                        Загрузить книги с аккаунта
                    </button>
                </div>
                <div className={styles.progress}>
                    {Math.round(progress * 100)}%
                </div>
                <button
                    className={styles.settingsButton}
                    onClick={() => setShowSettings(true)}
                >
                    Settings
                </button>
            </div>

            <div ref={viewerRef} className={styles.viewer} />

            {showSettings && (
                <div className={styles.dialogRoot}>
                    <div
                        className={styles.dialogOverlay}
                        onClick={() => setShowSettings(false)}
                    />
                    <div className={styles.dialogPanelWrapper}>
                        <div className={styles.dialogPanel}>
                            <div className={styles.dialogTitle}>
                                Reader Settings
                            </div>
                            <div className={styles.formGroup}>
                                <label>Font Size</label>
                                <input
                                    type="range"
                                    min={12}
                                    max={50}
                                    value={fontSize}
                                    onChange={e =>
                                        setFontSize(parseInt(e.target.value))
                                    }
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Theme</label>
                                <input
                                    type="checkbox"
                                    checked={theme === 'dark'}
                                    onChange={e =>
                                        setTheme(
                                            e.target.checked ? 'dark' : 'light'
                                        )
                                    }
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Font</label>
                                <select
                                    value={fontFamily}
                                    onChange={e =>
                                        setFontFamily(e.target.value)
                                    }
                                >
                                    <option value="serif">Serif</option>
                                    <option value="sans-serif">
                                        Sans-serif
                                    </option>
                                    <option value="monospace">Monospace</option>
                                </select>
                            </div>
                            <button
                                className={styles.closeButton}
                                onClick={() => setShowSettings(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
