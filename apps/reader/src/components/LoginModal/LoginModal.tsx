import { useState } from 'react';

import styles from './LoginModal.module.css';

import { useSignInMutation } from '../../../../store/src/lib/redux/features/user/userApi';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [signIn] = useSignInMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await signIn({ email, password });
            sessionStorage.setItem(
                'userCredentials',
                JSON.stringify({ email, password })
            );
        } catch (err: any) {
            console.log(err);
        }
    };

    if (!isOpen) return null; // Если модалка не открыта, ничего не рендерим

    return (
        <div className={styles.container}>
            <input
                type="email"
                className={styles.inputField}
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input
                type="password"
                className={styles.inputField}
                placeholder="Пароль"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button className={styles.button} onClick={handleSubmit}>
                Войти
            </button>
        </div>
    );
};

export default LoginModal;
