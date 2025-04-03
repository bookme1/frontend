'use client';

import React, { useEffect, useRef, useState } from 'react';

import ePub, { Location, Rendition } from 'epubjs';

import { getEpubFromIndexedDB } from './indexed-db-util';
import styles from './page.module.css';

const Page = () => {
    const viewerRef = useRef<HTMLDivElement>(null);
    const renditionRef = useRef<Rendition | null>(null);
    // const [book, setBook] = useState<Book | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const [showSettings, setShowSettings] = useState(false);
    const [fontSize, setFontSize] = useState<number>(18);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [fontFamily, setFontFamily] = useState<string>('serif');

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js').then(reg => {
                console.log('SW registered:', reg);
            });
        }
    }, []);

    useEffect(() => {
        const loadBook = async () => {
            const blob = await getEpubFromIndexedDB('півник-щось-там.epub');
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
    }, [theme, fontSize, fontFamily]);

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
