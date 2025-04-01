'use client';

import { useEffect, useState } from 'react';

import styles from './GenericModal.module.css';

import { closeModal, useDispatch, useSelector } from '../../lib/redux';
import { Icon } from '../common/Icon';

export const GenericModal = ({
    modalName,
    children,
    align = 'center',
}: {
    modalName: string;
    children: React.ReactNode;
    align?: 'left' | 'center' | 'right';
}) => {
    const dispatch = useDispatch();
    const isOpen = useSelector(
        (state: any) => state.modals?.modals[modalName]?.isOpen
    );
    const [modalElement, setModalElement] = useState<HTMLDivElement | null>(
        null
    );

    const handleCloseModal = (modalName: string) => {
        dispatch(closeModal(modalName));
    };

    useEffect(() => {
        if (isOpen) {
            const modalRoot = document.getElementById('modal-root');
            if (modalRoot) {
                const element = document.createElement('div');
                modalRoot.appendChild(element);
                setModalElement(element);
                return () => {
                    modalRoot.removeChild(element);
                };
            }
        }
    }, [isOpen]);

    if (!isOpen || !modalElement) {
        return null;
    }

    return (
        <div
            className={styles.modalWindow}
            onClick={() => handleCloseModal(modalName)}
        >
            <div
                className={`${styles.modalContainer} ${styles[align]}`}
                onClick={(e: any) => e.stopPropagation()}
            >
                <button
                    className={styles.closeButton}
                    onClick={() => handleCloseModal(modalName)}
                >
                    <Icon name="close_modal" size={38} />
                </button>
                {children}
            </div>
        </div>
    );
};
