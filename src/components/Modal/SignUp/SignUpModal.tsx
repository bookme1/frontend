import { authService } from "@/api/auth/authService";
import { useState, Dispatch, SetStateAction } from "react";
import {
  ModalContent,
  Title,
  Description,
  Form,
  ModalInput,
  SubmitButton,
  ChangeModalButton,
} from "../Modal.styles";
import { Agreement, AgreementLink } from "./SignUpModal.styles";

const SignUpModal = ({
  setType,
}: {
  setType: Dispatch<SetStateAction<string>>;
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    authService.signUp(name, email, password);
  };

  return (
    <ModalContent>
      <Title>Створити профіль</Title>
      <Description>
        Заповніть всі поля нижче, щоб створити свій профіль
      </Description>
      <Form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <ModalInput
          placeholder="Ім'я"
          onChange={(evt) => setName(evt.target.value)}
          required
        />
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
        <SubmitButton type="submit">Зареєструватись</SubmitButton>
      </Form>
      <Agreement>
        Реєструючись, ви погоджуєтеся{" "}
        <AgreementLink href="#">
          з угодою користувача і політикою конфіденційності
        </AgreementLink>{" "}
        bookme
      </Agreement>
      <Description>Або зареєструйтесь за допомогою:</Description>
      <Description>
        Вже є профіль?
        <ChangeModalButton
          onClick={() => {
            setType("sign-in");
          }}
        >
          Вхід
        </ChangeModalButton>
      </Description>
    </ModalContent>
  );
};

export default SignUpModal;
