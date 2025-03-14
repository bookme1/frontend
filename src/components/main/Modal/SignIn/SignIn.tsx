import React, { useCallback, useEffect, useState } from 'react';

import style from './SignInModal.module.css';
import Notify from '@/components/Notify/Notify';
import { NotificationState } from '@/components/Notify/NotifyType';
import { Icon } from '@/components/common/Icon';
import { useSignInMutation } from '@/lib/redux/features/user/userApi';

interface SignInProps {
    handleModalSignUp: () => void;
}

const SignIn: React.FC<SignInProps> = ({ handleModalSignUp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [signIn, { data, error, isLoading }] = useSignInMutation();

    const [notification, setNotification] = useState<NotificationState>({
        isVisible: false,
        text: '',
        type: 'information',
    });

    const updateNotification = useCallback(
        (newValues: Partial<typeof notification>) => {
            setNotification(prev => ({ ...prev, ...newValues }));
        },
        []
    );

    useEffect(() => {
        if (data) {
            updateNotification({
                isVisible: true,
                text: 'Вхід успішний!',
                type: 'success',
            });

            window.location.replace('/account');
        }
        if (error) {
            updateNotification({
                isVisible: true,
                text: 'Невірний імейл або пароль!',
                type: 'error',
            });
            console.log(error);
        }
    }, [data, error, updateNotification]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await signIn({ email, password });
            sessionStorage.setItem(
                'userCredentials',
                JSON.stringify({ email, password })
            );
        } catch (err: any) {
            updateNotification({
                isVisible: true,
                text: `Невірний імейл або пароль!, ${err.status}`,
                type: 'error',
            });
        }
    };

    return (
        <div className={style.modalContainer}>
            <p className={style.title}>Увійти в кабінет</p>
            <p className={style.description}>
                Увійдіть, щоб додавати товари у обране і бачити свої замовлення
            </p>
            <form className={style.form} onSubmit={e => handleSubmit(e)}>
                <input
                    className={style.modalInput}
                    placeholder="Імейл"
                    onChange={evt => setEmail(evt.target.value)}
                    autoComplete="email"
                    required
                />
                <div style={{ position: 'relative' }}>
                    <input
                        className={style.modalInput}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Пароль"
                        onChange={evt => setPassword(evt.target.value)}
                        autoComplete="current-password" 
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
                {notification.isVisible && (
                    <Notify
                        text={notification.text}
                        duration={5}
                        type={notification.type}
                    />
                )}
                <button
                    className={`${style.submitBtn} ${isLoading ? style.submitBtnDisabled : ''}`}
                    type="submit"
                    disabled={isLoading}
                >
                    Увійти
                </button>
            </form>
            <p className={`${style.description} ${style.google}`}>
                Або увійдіть за допомогою:
            </p>
            <button
                className={style.googleBtn}
                onClick={() => {
                    window.location.href =
                        'http://localhost:5050/api/auth/signin/google';
                }}
            >
                <Icon name="google" size="24" />
            </button>
            <p className={style.description}>
                Немає профілю?
                <button
                    className={style.changeModalBtn}
                    onClick={() => {
                        handleModalSignUp();
                    }}
                >
                    Реєстрація
                </button>
            </p>
        </div>
    );
};

export default SignIn;
