import { signIn as googleSignIn } from 'next-auth/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { setCookie } from '@/components/Cookie/Cookie';
import Notify from '@/components/Notify/Notify';
import { NotificationState, NotifyType } from '@/components/Notify/NotifyType';
import { Icon } from '@/components/common/Icon';
import { useSignInMutation } from '@/lib/redux/features/user/userApi';

import {
    ChangeModalButton,
    Description,
    Form,
    GoogleBtn,
    ModalContent,
    ModalInput,
    SubmitButton,
    Title,
} from '../Modal.styles';

const SignInModal = ({
    setType,
}: {
    setType: Dispatch<SetStateAction<string>>;
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [signIn, { data, error, isLoading }] = useSignInMutation();

    const [notification, setNotification] = useState<NotificationState>({
        isVisible: false,
        text: '',
        type: 'information',
    });

    const updateNotification = (newValues: Partial<typeof notification>) => {
        setNotification(prev => ({ ...prev, ...newValues }));
    };

    useEffect(() => {
        if (data) {
            updateNotification({
                isVisible: true,
                text: 'Вхід успішний!',
                type: 'success',
            });

            setCookie(
                'accessToken',
                data.tokens.accessToken,
                3 * 24 * 60 * 60,
                {
                    path: '/',
                    secure: true,
                    sameSite: 'strict',
                }
            );

            setCookie(
                'refreshToken',
                data.tokens.refreshToken,
                30 * 24 * 60 * 60,
                {
                    path: '/',
                    secure: true,
                    sameSite: 'strict',
                }
            );

            window.location.replace('/account');
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            updateNotification({
                isVisible: true,
                text: 'Невірний імейл або пароль!',
                type: 'error',
            });
        }
    }, [error]);

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
                text: 'Невірний імейл або пароль!, ${err.status}',
                type: 'error',
            });
            console.error('Error while logging in', err);
        }
    };

    return (
        <ModalContent>
            <Title>Увійти в кабінет</Title>
            <Description>
                Увійдіть, щоб додавати товари у обране і бачити свої замовлення
            </Description>
            <Form onSubmit={e => handleSubmit(e)}>
                <ModalInput
                    placeholder="Імейл"
                    onChange={evt => setEmail(evt.target.value)}
                    required
                />
                <div style={{ position: 'relative' }}>
                    <ModalInput
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
                {notification.isVisible && (
                    <Notify
                        text={notification.text}
                        duration={5}
                        type={notification.type}
                    />
                )}
                <SubmitButton type="submit">Увійти</SubmitButton>
            </Form>
            <Description className="google">
                Або увійдіть за допомогою:
            </Description>
            <GoogleBtn
                onClick={() => {
                    googleSignIn();
                }}
            >
                <Icon name="google" size="24" />
            </GoogleBtn>
            <Description>
                Немає профілю?
                <ChangeModalButton
                    onClick={() => {
                        setType('sign-up');
                    }}
                >
                    Реєстрація
                </ChangeModalButton>
            </Description>
        </ModalContent>
    );
};

export default SignInModal;
