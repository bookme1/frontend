'use client';

import styled from '@emotion/styled';

import '@/styles/fonts';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1000;
`;

export const Modal = styled.div`
  max-width: 437px;
  border-radius: 24px;
  padding: 32px 24px;
  position: absolute;
  background-color: #ffffff;

  .close-btn {
    position: absolute;
    top: 16px;
    right: 16px;
  }

  .title {
    font-size: 24px;
    font-weight: 700;
    line-height: 33.6px;
    color: #121212;
    margin-bottom: 40px;
  }
  .themes {
    display: flex;
    gap: 36px;
    margin-bottom: 40px;
  }

  .themes-list {
    display: flex;
    gap: 36px;
  }

  .theme-btn {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  .light {
    border: 1px solid var(--red);
  }

  .dark {
    background-color: #000000;
  }

  .beige {
    background-color: #f8ce90;
  }

  .font-sizes {
    display: flex;
    gap: 40px;
    margin-bottom: 40px;
    align-items: center;
  }

  .range-slider {
    position: relative;
    height: 2px;
    background-color: var(--red);
    cursor: pointer;
  }

  .fonts {
    display: flex;
    gap: 36px;
  }

  .fonts-list {
    display: flex;
    gap: 36px;
  }

  .font-btn {
    width: 68px;
    padding: 4px 24px;
    border-radius: 100px;
    box-shadow: -1px -1px 4px 0px #0000001a;
    font-size: 18px;
    font-weight: 700;
    line-height: 20.7px;

    &:hover {
      box-shadow: 1px 2px 4px 0px #00000026;
    }
  }

  .vivaldi {
    font-family: 'Vivaldi', sans-serif;
    /* font-style: italic; */
    font-weight: 400;
  }

  .times-new-roman {
    font-family: 'Times New Roman';
  }
`;
