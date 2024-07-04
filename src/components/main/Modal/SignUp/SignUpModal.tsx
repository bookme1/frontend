import { Dispatch, SetStateAction, useState } from 'react';

import Notiflix from 'notiflix';

import { Agreement, AgreementLink } from './SignUpModal.styles';
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
  const [signUp, { data, error, isLoading }] = useSignUpMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await signUp({ username: name, email, password }).unwrap();
      Notiflix.Notify.success('Реєстрація успішна!');
      Notiflix.Notify.warning(
        'Активуйте акаунт по посиланню на вашій пошті. Лист може знаходитись у спамі'
      );
    } catch (err: any) {
      Notiflix.Notify.warning('Помилка при реєстрації ', err.status);
      console.error('Error while registrating', err);
    }
  };

  return (
    <ModalContent>
      <Title>Створити профіль</Title>
      <Description>
        Заповніть всі поля нижче, щоб створити свій профіль
      </Description>
      <Form
        onSubmit={e => {
          handleSubmit(e);
        }}
      >
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
        <ModalInput
          placeholder="Пароль"
          onChange={evt => setPassword(evt.target.value)}
          required
        />
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
        <ChangeModalButton
          onClick={() => {
            setType('sign-in');
          }}
        >
          Вхід
        </ChangeModalButton>
      </Description>
    </ModalContent>
  );
};

export default SignUpModal;
