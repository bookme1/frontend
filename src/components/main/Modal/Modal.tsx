import { Dispatch, SetStateAction, useState } from 'react';

import styles from './Modal.module.css';
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
        <div
            className={styles.modalWindow}
            onClick={() => {
                setIsOpen(false);
            }}
        >
            <div
                className={styles.modalContainer}
                onClick={e => e.stopPropagation()}
            >
                <button
                    className={styles.closeButton}
                    onClick={handleCloseModal}
                >
                    <Icon name="close_modal" size={48} />
                </button>
                {type === 'sign-up' && <SignUpModal setType={setType} />}
                {type === 'sign-in' && <SignInModal setType={setType} />}
            </div>
        </div>
    );
};

export default Modal;
