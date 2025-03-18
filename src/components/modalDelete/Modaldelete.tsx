'use client';

import { useCallback, useEffect } from 'react';
import styles from './ModalDelete.module.css'; 

export default function ModalDelete({
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
                    <div className={styles.header}>
                        <h1 className="font-bold">Ви впевнені що бажаєте видалити книгу:</h1>
                        <div className={styles.bookTitle}>
                            <p>Назва книги</p>
                        </div>
                        <div className={styles.bookSKU}>
                            <p className="font-bold">Артикул</p>
                        </div>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button className={`${styles.button} ${styles.deleteButton}`}>
                            Видалити
                        </button>
                        <button
                            className={`${styles.button} ${styles.cancelButton}`}
                            onClick={() => onClose()}
                        >
                            Відміна
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
