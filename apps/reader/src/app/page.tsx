// src/app/reader/page.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';

import ePub, { Book, Rendition } from 'epubjs';

import styles from './page.module.css';

// src/app/reader/page.tsx

// src/app/reader/page.tsx

// src/app/reader/page.tsx

// src/app/reader/page.tsx

// src/app/reader/page.tsx

// src/app/reader/page.tsx

// src/app/reader/page.tsx

// src/app/reader/page.tsx

// src/app/reader/page.tsx

const Page = () => {
    const viewerRef = useRef<HTMLDivElement>(null);
    const renditionRef = useRef<Rendition | null>(null);
    const [book, setBook] = useState<Book | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const [showSettings, setShowSettings] = useState(false);
    const [fontSize, setFontSize] = useState<number>(100);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [fontFamily, setFontFamily] = useState<string>('serif');
    const [notes, setNotes] = useState<{ cfi: string; text: string }[]>([]);
    const [selectedText, setSelectedText] = useState<string>('');
    const [noteInput, setNoteInput] = useState<string>('');

    useEffect(() => {
        const book = ePub('/book.epub');
        setBook(book);
        const rendition = book.renderTo(viewerRef.current!, {
            width: '100%',
            height: '100%',
        });

        rendition.themes.default({
            body: {
                background: theme === 'dark' ? '#1e1e1e' : '#fff',
                color: theme === 'dark' ? '#fff' : '#000',
                fontSize: `${fontSize}%`,
                fontFamily,
            },
        });

        rendition.display();
        renditionRef.current = rendition;

        rendition.on('relocated', location => {
            const percentage = book.locations.percentageFromCfi(
                location.start.cfi
            );
            setProgress(percentage);
            localStorage.setItem('reader-progress', percentage.toString());
        });

        rendition.on('selected', (cfiRange, contents) => {
            contents.window.getSelection()?.removeAllRanges();
            const text = contents.window.getSelection()?.toString() || '';
            setSelectedText(text);
        });

        book.ready.then(() => {
            book.locations.generate(1000).then(() => {
                const savedProgress = localStorage.getItem('reader-progress');
                if (savedProgress) {
                    const loc = book.locations.cfiFromPercentage(
                        parseFloat(savedProgress)
                    );
                    rendition.display(loc);
                }
            });
        });

        return () => rendition.destroy();
    }, [theme, fontSize, fontFamily]);

    const handleAddNote = () => {
        if (selectedText && noteInput) {
            setNotes([
                ...notes,
                {
                    cfi:
                        renditionRef.current?.currentLocation().start.cfi || '',
                    text: noteInput,
                },
            ]);
            setNoteInput('');
        }
    };

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
                                    min={80}
                                    max={150}
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

            {selectedText && (
                <div className={styles.noteBox}>
                    <div className={styles.noteTitle}>Add Note</div>
                    <textarea
                        className={styles.noteInput}
                        placeholder="Write your note..."
                        value={noteInput}
                        onChange={e => setNoteInput(e.target.value)}
                    />
                    <button
                        className={styles.saveNoteButton}
                        onClick={handleAddNote}
                    >
                        Save Note
                    </button>
                </div>
            )}
        </div>
    );
};

export default Page;
