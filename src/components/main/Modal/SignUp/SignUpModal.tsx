import { Dispatch, SetStateAction, useState } from 'react';

import Notiflix from 'notiflix';

import {
    Agreement,
    AgreementLink,
    CheckboxContainer,
    RoleCheckbox,
    RoleCheckboxLabel,
} from './SignUpModal.styles';
import { Notify } from '@/components/Notify';
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

    const [notifyVisible, setNotifyVisible] = useState(false);
    const [notifyText, setNotifyText] = useState('');
    const [notifyType, setNotifyType] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const role = isAuthor ? 'Author' : 'User';
            await signUp({ username: name, email, password, role }).unwrap();
            // Notiflix.Notify.success('Реєстрація успішна!');
            // Notiflix.Notify.warning(
            //     'Активуйте акаунт по посиланню на вашій пошті. Лист може знаходитись у спамі'
            // );

            setNotifyVisible(true);
            setNotifyText('Реєстрація успішна!');
            setNotifyType('success');

            setNotifyVisible(true);
            setNotifyText(
                'Активуйте акаунт по посиланню на вашій пошті. Лист може знаходитись у спамі'
            );
            setNotifyType('information');
        } catch (err: any) {
            // Notiflix.Notify.warning('Помилка при реєстрації', err.status);
            setNotifyVisible(true);
            setNotifyText(`Помилка при реєстрації ${err.status}`);
            setNotifyType('error');
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
            {notifyVisible && (
                <Notify text={notifyText} duration={5} type={notifyType} />
            )}
        </ModalContent>
    );
};

export default SignUpModal;
