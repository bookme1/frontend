import { ModalWindow, ModalContainer, CloseButton } from "./Modal.styles";
import { useState, Dispatch, SetStateAction } from "react";
import { Icon } from "../../common/Icon";
import { SignUpModal } from "./SignUp";
import { SignInModal } from "./SignIn";

const Modal = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [type, setType] = useState("sign-in");

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  return (
    <ModalWindow
      onClick={() => {
        setIsOpen(false);
      }}
    >
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={handleCloseModal}>
          <Icon name="close_modal" size={48} />
        </CloseButton>
        {type === "sign-up" && <SignUpModal setType={setType} />}
        {type === "sign-in" && <SignInModal setType={setType} />}
      </ModalContainer>
    </ModalWindow>
  );
};

export default Modal;
