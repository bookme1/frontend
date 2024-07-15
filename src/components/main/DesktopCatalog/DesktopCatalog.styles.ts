"use client";
import styled from "@emotion/styled";

export const ModalWindow = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 9;
`;

export const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 80%;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: 0 15px 30px 0 rgba(0,0,0 , 0.25);
  padding: 31px 24px;
    overflow-y: hidden;
  @media (min-width: 768px) {
    border-radius: 16px;
    top: 100px;
    flex-direction: row;
    gap: 50px;
  }
  @media (min-width: 1280px) {
    left: calc((100vw - 1280px) / 2);
    width: 842px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
`;

export const ModalContent = styled.div``;
