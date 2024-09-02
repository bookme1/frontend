'use client';

import { useEffect, useState } from 'react';

import { CloseButton, ModalContainer, ModalWindow } from './GenericModal.syles';
import { closeModal, useDispatch, useSelector } from '@/lib/redux';

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
    const isOpen = useSelector((state: any) => state.modals[modalName]?.isOpen);
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
        <ModalWindow
            onClick={() => {
                handleCloseModal(modalName);
            }}
        >
            <ModalContainer
                onClick={(e: any) => e.stopPropagation()}
                align={align}
            >
                <CloseButton onClick={() => handleCloseModal(modalName)}>
                    <Icon name="close_modal" size={48} />
                </CloseButton>
                {children}
            </ModalContainer>
        </ModalWindow>
    );
};
