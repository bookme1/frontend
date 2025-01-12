import { signIn as googleSignIn } from 'next-auth/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import Notiflix from 'notiflix';

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

    useEffect(() => {
        if (data) {
            Notiflix.Notify.success('Вхід успішний!');
            localStorage.setItem('accessToken', data.tokens.accessToken);
            localStorage.setItem('refreshToken', data.tokens.refreshToken);
            window.location.replace('/account');
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            Notiflix.Notify.failure('Невірний імейл або пароль!');
        }
    }, [error]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await signIn({ email, password });
        } catch (err: any) {
            console.error('Error while logging in', err);
            Notiflix.Notify.failure('Помилка при вході в аккаунт ', err.status);
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
