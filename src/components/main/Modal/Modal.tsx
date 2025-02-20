import { Dispatch, SetStateAction, useState } from 'react';

import { CloseButton, ModalContainer, ModalWindow } from './Modal.styles';
import { SignInModal } from './SignIn';
import { SignUpModal } from './SignUp';

import { Icon } from '../../common/Icon';

const Modal = ({
    setIsOpen,
}: {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
    const [type, setType] = useState('sign-in');

    const handleCloseModal = () => {
        setIsOpen(false);
    };
    return (
        <ModalWindow
            onClick={() => {
                setIsOpen(false);
            }}
        >
            <ModalContainer onClick={e => e.stopPropagation()}>
                <CloseButton onClick={handleCloseModal}>
                    <Icon name="close_modal" size={48} />
                </CloseButton>
                {type === 'sign-up' && <SignUpModal setType={setType} />}
                {type === 'sign-in' && <SignInModal setType={setType} />}
            </ModalContainer>
        </ModalWindow>
    );
};

export default Modal;
