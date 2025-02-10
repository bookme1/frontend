import { Dispatch, SetStateAction, useState } from 'react';

import {
    Agreement,
    AgreementLink,
    CheckboxContainer,
    RoleCheckbox,
    RoleCheckboxLabel,
} from './SignUpModal.styles';
import Notify from '@/components/Notify/Notify';
import { NotificationState, NotifyType } from '@/components/Notify/NotifyType';
import { Icon } from '@/components/common/Icon';
import { useSignUpMutation } from '@/lib/redux/features/user/userApi';

import {
    ChangeModalButton,
    Description,
    Form,
    ModalContent,
    ModalInput,
    SubmitButton,
    Title,
} from '../Modal.styles';

const SignUpModal = ({
    setType,
}: {
    setType: Dispatch<SetStateAction<string>>;
}) => {
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
    });

    const updateNotification = (newValues: Partial<typeof notification>) => {
        setNotification(prev => ({ ...prev, ...newValues }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const role = isAuthor ? 'Author' : 'User';
            await signUp({ username: name, email, password, role }).unwrap();

            updateNotification({
                isVisible: true,
                text: 'Реєстрація успішна!',
                type: 'success',
            });

            updateNotification({
                isVisible: true,
                text: 'Активуйте акаунт по посиланню на вашій пошті. Лист може знаходитись у спамі',
                type: 'information',
            });
        } catch (err: any) {
            updateNotification({
                isVisible: true,
                text: `Помилка при реєстрації ${err.status}`,
                type: 'error',
            });
            console.error('Error while registering', err);
        }
    };

    return (
        <ModalContent>
            <Title>Створити профіль</Title>
            <Description>
                Заповніть всі поля нижче, щоб створити свій профіль
            </Description>
            <Form onSubmit={handleSubmit}>
                <ModalInput
                    placeholder="Ім'я"
                    onChange={evt => setName(evt.target.value)}
                    required
                />
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
                <CheckboxContainer>
                    <RoleCheckbox
                        type="checkbox"
                        id="isAuthor"
                        checked={isAuthor}
                        onChange={() => setIsAuthor(!isAuthor)}
                    />
                    <RoleCheckboxLabel htmlFor="isAuthor">
                        Реєстрація як автор
                    </RoleCheckboxLabel>
                </CheckboxContainer>
                {notification.isVisible && (
                    <Notify
                        text={notification.text}
                        duration={5}
                        type={notification.type}
                    />
                )}
                <SubmitButton type="submit">Зареєструватись</SubmitButton>
            </Form>
            <Agreement>
                Реєструючись, ви погоджуєтеся
                <AgreementLink href="#">
                    з угодою користувача і політикою конфіденційності
                </AgreementLink>
                bookme
            </Agreement>
            <Description>Або зареєструйтесь за допомогою:</Description>
            <Description>
                Вже є профіль?
                <ChangeModalButton onClick={() => setType('sign-in')}>
                    Вхід
                </ChangeModalButton>
            </Description>
        </ModalContent>
    );
};

export default SignUpModal;
