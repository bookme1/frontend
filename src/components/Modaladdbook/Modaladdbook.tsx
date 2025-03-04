'use client';

import React, { useCallback, useEffect } from 'react';
import styles from './ModalAddBook.module.css';

export default function ModalAddBook({
    isVisible,
    onClose,
}: {
    isVisible: boolean;
    onClose: any;
}) {
    const handleClose = (e: any) => {
        if (e.target.id === 'wrapper') onClose();
    };

    const handleKeyDown = useCallback(
        (e: any) => {
            if (e.key === 'Escape') onClose();
        },
        [onClose]
    );

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    if (!isVisible) return null;

    return (
        <div
            className={styles.wrapper}
            id="wrapper"
            onClick={handleClose}
        >
            <div className={styles.modalContainer}>
                <div className={styles.modalContent}>
                    <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>
                            Назва
                            <input
                                type="text"
                                placeholder="Назва"
                                className={`${styles.inputField}`}
                            />
                        </label>
                        <label className={styles.inputLabel}>
                            <p className="opacity-0">Категорія</p>
                            <select
                                name=""
                                id=""
                                className={styles.selectField}
                            >
                                <option value="" disabled selected>
                                    Категорія
                                </option>
                                <option value="">1</option>
                                <option value="">2</option>
                                <option value="">3</option>
                            </select>
                        </label>
                        <label className={styles.inputLabel}>
                            <p className="opacity-0">Мова</p>
                            <select
                                name=""
                                id=""
                                className={styles.selectField}
                            >
                                <option value="" disabled selected>
                                    Мова
                                </option>
                                <option value="">Українська</option>
                                <option value="">Англiйська</option>
                                <option value="">Нiмецька</option>
                            </select>
                        </label>
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>
                            Автор
                            <input
                                type="text"
                                placeholder="Автор"
                                className={styles.inputField}
                            />
                        </label>
                        <label className={styles.inputLabel}>
                            Ціна
                            <input
                                type="text"
                                placeholder="Ціна"
                                className={`${styles.inputField} ${styles.inputFieldSmall}`}
                            />
                        </label>
                        <label className={styles.inputLabel}>
                            Сторінки
                            <input
                                type="text"
                                placeholder="Сторінки"
                                className={`${styles.inputField} ${styles.inputFieldSmall}`}
                            />
                        </label>
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>
                            Видавництво
                            <input
                                type="text"
                                placeholder="Видавництво"
                                className={styles.inputField}
                            />
                        </label>
                        <label className={styles.inputLabel}>
                            URL Картинки
                            <input
                                type="text"
                                placeholder="URL"
                                className={styles.inputField}
                            />
                        </label>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="description" className="text-gray-700">
                            Опис
                        </label>
                        <textarea
                            placeholder="Опис"
                            id="description"
                            name="description"
                            rows={5}
                            className={styles.textAreaField}
                        ></textarea>
                    </div>

                    <div className={styles.buttonGroup}>
                        <button className={styles.button}>
                            Зберегти
                        </button>
                        <button
                            onClick={() => onClose()}
                            className={`${styles.button} ${styles.buttonCancel}`}
                        >
                            Відміна
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
