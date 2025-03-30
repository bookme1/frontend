import React, { useEffect, useState } from 'react';

import styles from './SignUpModal.module.css';
import Notify from '@/components/Notify/Notify';
import { NotificationState } from '@/components/Notify/NotifyType';
import { Icon } from '@/components/common/Icon';
import { useSignUpMutation } from '@/lib/redux/features/user/userApi';

interface SignUpProps {
    handleModalSignIn: () => void;
    onClose: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ handleModalSignIn, onClose }) => {
    const baseBackendUrl = process.env.NEXT_PUBLIC_BASE_BACKEND_URL ?? '';

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isAuthor, setIsAuthor] = useState(false);
    const [signUp, { data, error, isLoading }] = useSignUpMutation();

    const [notification, setNotification] = useState<NotificationState>({
        isVisible: false,
        text: '',
        type: 'information',
        duration: 3,
    });

    const updateNotification = (
        newValues: Partial<typeof notification>,
        duration: number = 5
    ) => {
        setNotification(prev => ({ ...prev, ...newValues }));

        if (newValues.isVisible) {
            setTimeout(() => {
                setNotification(prev => ({ ...prev, isVisible: false }));
            }, duration * 1000);
        }
    };

    const getMailServiceUrl = (email: string) => {
        const domain = email.split('@')[1];
        switch (domain) {
            case 'gmail.com':
                return 'https://mail.google.com/mail/u/0/#inbox';
            case 'yahoo.com':
                return 'https://mail.yahoo.com/';
            case 'outlook.com':
            case 'hotmail.com':
                return 'https://outlook.live.com/mail/';
            case 'mail.ru':
                return 'https://e.mail.ru/inbox/';
            case 'yandex.ru':
                return 'https://mail.yandex.ru/';
            default:
                return null;
        }
    };

    const mailUrl = getMailServiceUrl(email);

    useEffect(() => {
        if (data && !notification.isVisible) {
            if (mailUrl) {
                window.location.href = mailUrl;
            } else {
                onClose();
            }
        }

        if (error) {
            console.log(error);
        }
    }, [data, error, mailUrl, notification.isVisible, onClose]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const role = isAuthor ? 'Author' : 'User';
            await signUp({ username: name, email, password, role }).unwrap();

            updateNotification({
                isVisible: true,
                text: 'Активуйте акаунт по посиланню на вашій пошті. Лист може знаходитись у спамі',
                type: 'information',
                duration: 10,
            });

            if (mailUrl) {
                window.location.href = mailUrl;
            }
        } catch (err: any) {
            updateNotification({
                isVisible: true,
                text: `Помилка при реєстрації ${err.status}`,
                type: 'error',
                duration: 10,
            });
            console.error('Error while registering', err);
        }
    };

    return (
        <div className={styles.modalContainer}>
            <p className={styles.title}>Створити профіль</p>
            <p className={styles.description}>
                Заповніть всі поля нижче, щоб створити свій профіль
            </p>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    className={styles.modalInput}
                    placeholder="Ім'я"
                    onChange={evt => setName(evt.target.value)}
                    required
                />
                <input
                    className={styles.modalInput}
                    placeholder="Імейл"
                    onChange={evt => setEmail(evt.target.value)}
                    required
                />
                <div style={{ position: 'relative' }}>
                    <input
                        className={styles.modalInput}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Пароль"
                        onChange={evt => setPassword(evt.target.value)}
                        required
                    />
                    <Icon
                        name={showPassword ? 'icon-eye' : 'icon-eye-slash'}
                        size={24}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: '10px',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer',
                        }}
                        onClick={() => setShowPassword(!showPassword)}
                    />
                </div>
                <div className={styles.checkboxContainer}>
                    <input
                        className={styles.roleCheckbox}
                        type="checkbox"
                        id="isAuthor"
                        checked={isAuthor}
                        onChange={() => setIsAuthor(!isAuthor)}
                    />
                    <label
                        className={styles.roleCheckboxLabel}
                        htmlFor="isAuthor"
                    >
                        Реєстрація як автор
                    </label>
                </div>
                {notification.isVisible && (
                    <Notify
                        text={notification.text}
                        duration={10}
                        type={notification.type}
                    />
                )}
                <button
                    className={`${styles.submitButton} ${isLoading ? styles.submitBtnDisabled : ''}`}
                    type="submit"
                    disabled={isLoading}
                >
                    Зареєструватись
                </button>
            </form>
            <p className={styles.agreement}>
                Реєструючись, ви погоджуєтеся
                <a className={styles.agrementLink} href="#">
                    з угодою користувача і політикою конфіденційності
                </a>
                bookme
            </p>
            <p className={styles.description}>
                Або зареєструйтесь за допомогою:
            </p>
            <button
                className={styles.googleBtn}
                onClick={() => {
                    window.location.href = `${baseBackendUrl}/api/auth/signin/google`;
                }}
            >
                <Icon name="google" size="24" />
            </button>
            <p className={styles.description}>
                Вже є профіль?
                <button
                    className={styles.changeModalButton}
                    onClick={() => handleModalSignIn()}
                >
                    Вхід
                </button>
            </p>
        </div>
    );
};

export default SignUp;
