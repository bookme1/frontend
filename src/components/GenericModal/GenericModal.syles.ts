"use client";

import styled from "@emotion/styled";

export const ModalWindow = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;
`;

export const ModalContainer = styled.div`
  position: relative;
  max-height: 95%;
  /* width: 518px; */
  margin-left: auto;
  margin-right: auto;
  background-color: #fff;
  border-radius: 16px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 6px;
    width: 0px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--gray_border);
    border-radius: 6px;
  }

  display: flex;
  flex-direction: column;
  box-shadow: 0 15px 30px 0 rgba(#000, 0.25);
  padding: 31px 24px;
  @media (max-width: 600px) {
    width: 90%;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
`;

export const ModalContent = styled.div``;

export const Title = styled.p`
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 31px;
`;

export const Description = styled.p`
  text-align: center;
  margin-bottom: 40px;
  font-size: 18px;

  &.google {
    margin-bottom: 20px;
  }
`;

export const Form = styled.form`
  width: 470px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 24px;
`;

export const ModalInput = styled.input`
  width: 100%;
  border-radius: 10px;
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 12px 24px;
`;

export const SubmitButton = styled.button`
  width: 215px;
  padding: 12px 32px;
  background-color: var(--red);
  border-radius: 8px;
  margin: 0 auto;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
`;

export const ChangeModalButton = styled.button`
  padding-left: 16px;
  font-size: 18px;
  font-weight: 700;
  color: var(--blue);
`;

export const GoogleBtn = styled.button`
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 1px 6px 0px #00000026;
  border: 1px solid #00000026;
  border-radius: 50%;
  margin: 0 auto 24px;
  transition: background-color 0.1s ease-in-out;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.1);
  }
  &:active {
    background-color: rgba(0, 0, 0, 0.1);
    border-color: rgba(0, 0, 0, 0.15);
  }
`;
