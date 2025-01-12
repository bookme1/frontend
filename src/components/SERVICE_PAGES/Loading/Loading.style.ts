'use client';

import Lottie from 'lottie-react';

import styled from '@emotion/styled';

import { Icon } from '@/components/common/Icon';

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

export const Content = styled.div`
  margin: 0 auto;
  margin-top: -200px; /// Book is only half size of a container and we can't change it
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

export const StyledLottie = styled(Lottie)`
  width: 400px;
  height: 400px;
  margin-bottom: -100px;
  pointer-events: none;
`;

export const StyledIcon = styled(Icon)`
  /// Сделать мобильную версию, медиа ширина и высота
  width: 217px !important;
  height: 40px !important;
  margin: 0 auto;
`;

export const CenteringLogo = styled.div`
  padding-left: 43px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
