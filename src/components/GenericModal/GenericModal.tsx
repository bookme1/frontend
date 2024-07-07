import { closeModal, useDispatch } from "@/lib/redux";
import { CloseButton, ModalContainer, ModalWindow } from "./GenericModal.syles";
import { Icon } from "../common/Icon";

export const Modal = ({
    modalName, children
}:{modalName:string, children:React.ReactNode}) => {
    const dispatch = useDispatch();

    const handleCloseModal = (modalName: string) => {
        dispatch(closeModal(modalName));
      };
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


