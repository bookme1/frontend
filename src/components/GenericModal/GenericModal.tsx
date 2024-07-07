"use client"

import { closeModal,  useDispatch, useSelector  } from "@/lib/redux";
import { CloseButton, ModalContainer, ModalWindow } from "./GenericModal.syles";
import { Icon } from "../common/Icon";
import { useEffect } from "react";


const modalRoot = document.getElementById("modal-root");

export const Modal = ({
    modalName, children
}:{modalName:string, children:React.ReactNode}) => {
 
    const dispatch = useDispatch();
 const isOpen = useSelector((state: any) => state.modals[modalName]?.isOpen);

    const handleCloseModal = (modalName: string) => {
        dispatch(closeModal(modalName));
      };

      useEffect(() => {
        if (isOpen && modalRoot) {
            const modalElement = document.createElement("div");
            modalRoot.appendChild(modalElement);
            return () => {
                modalRoot.removeChild(modalElement);
            };
        }
    }, [isOpen]);

  return (
    <ModalWindow
      onClick={() => {
        handleCloseModal(modalName);
      }}
    >
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={() => handleCloseModal(modalName)}>
          <Icon name="close_modal" size={48} />
        </CloseButton>
        {children}
      </ModalContainer>
    </ModalWindow>
  );
};


