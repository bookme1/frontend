"use client";
import { authService } from "@/api/auth/authService";
import styled from "@emotion/styled";
import { Dispatch, SetStateAction, useState } from "react";
import {
  ModalContent,
  Title,
  Description,
  Form,
  ModalInput,
  SubmitButton,
  ChangeModalButton,
} from "../Modal.styles";

const SignInModal = ({
  setType,
}: {
  setType: Dispatch<SetStateAction<string>>;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    authService.signIn(email, password);
  };

  return (
    <ModalContent>
      <Title>Увійти в кабінет</Title>
      <Description>
        Увійдіть, щоб додавати товари у обране і бачити свої замовлення
      </Description>
      <Form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <ModalInput
          placeholder="Імейл"
          onChange={(evt) => setEmail(evt.target.value)}
          required
        />
        <ModalInput
          placeholder="Пароль"
          onChange={(evt) => setPassword(evt.target.value)}
          required
        />
        <SubmitButton type="submit">Увійти</SubmitButton>
      </Form>
      <Description>Або увійдіть за допомогою:</Description>
      <Description>
        Немає профілю?
        <ChangeModalButton
          onClick={() => {
            setType("sign-up");
          }}
        >
          Реєстрація
        </ChangeModalButton>
      </Description>
    </ModalContent>
  );
};

export default SignInModal;
