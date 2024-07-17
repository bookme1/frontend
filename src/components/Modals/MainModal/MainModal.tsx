'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import modalStyles from './MainModal.module.css';
import Icon from '@/components/common/Icon/Icon.tsx';
import { setModalStatus } from '@/lib/redux/slices/modalsSlice/modalsSlice';
import { useDispatch } from '@/lib/redux/store';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const MainModal = ({ open, onClose, children }: ModalProps) => {
  const dispatch = useDispatch();
  const [modalRootElement, setModalRootElement] = useState<HTMLElement | null>(
    null
  );

  useEffect(() => {
    const modalElement = document.querySelector<HTMLElement>('#modal-root');
    setModalRootElement(modalElement);
  }, []);

  const element = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    if (open) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.paddingRight = '0';
      document.body.style.overflowY = 'auto';
    }

    return () => {
      document.body.style.paddingRight = '0';
      document.body.style.overflowY = 'auto';
    };
  }, [open]);

  const handleCloseUserModal = () => {
    dispatch(setModalStatus(false));
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        onClose();
      }
    },
    [open, onClose]
  );

  const handleBackdropClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    if (modalRootElement) {
      modalRootElement.appendChild(element);
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      if (modalRootElement) {
        modalRootElement.removeChild(element);
      }
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [element, handleKeyDown, open, modalRootElement]);

  if (!modalRootElement) {
    return null;
  }

  return createPortal(
    open && (
      <div className={modalStyles.backdrop} onClick={handleBackdropClick}>
        <div className={modalStyles.modalContent}>
          {/*<button*/}
          {/*  className={modalStyles['close-button']}*/}
          {/*  onClick={handleCloseUserModal}*/}
          {/*>*/}
          {/*  <Icon width={24} height={24} name={'close-ai-modal'} />*/}
          {/*</button>*/}
          {children}
        </div>
      </div>
    ),
    element
  );
};

export default MainModal;
