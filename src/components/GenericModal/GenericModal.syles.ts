"use client";

import styled from "@emotion/styled";

interface ModalContainerProps {
  align?: 'left' | 'center' | 'right';
}

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

export const ModalContainer = styled.div<ModalContainerProps>`
  position: relative;
  max-height: 100%;
  background-color: #fff;
  border-radius: 16px;
  overflow-y: scroll;
  margin-left: ${props => (props.align === 'left' ? '0' : props.align === 'right' ? 'auto' : 'auto')};
  margin-right: ${props => (props.align === 'left' ? 'auto' : props.align === 'right' ? '0' : 'auto')};
  left: ${props => (props.align === 'center' ? '50%' : 'initial')};
  transform: ${props => (props.align === 'center' ? 'translateX(-50%)' : 'none')};

  &::-webkit-scrollbar {
    width: 6px;
    width: 0px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--gray_border);
    border-radius: 6px;
  }
`;


export const CloseButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 999;
`;
