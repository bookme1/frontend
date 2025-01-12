'use client';

import styled from '@emotion/styled';

import { Wrapper } from '@/styles/globals.styles';

export const ContentWrapper = styled(Wrapper)`
  height: 800px;
  background-color: var(--primary-background-color);
  /* padding-bottom: 80px; */
  /* padding: 0 16px; */
  margin-bottom: 40px;
  margin-top: 140px;


  @media (min-width: 768px) {
    padding-bottom: 48px;
  }

  @media (min-width: 1280px) {
    font-weight: 700;
    line-height: 28.8px;
  }

  .illustration {
    margin: 32px 0;

    @media (min-width: 768px) {
      margin: 48px 0;
    }
  }

  .text {
    font-size: 18px;
    font-weight: 500;
    line-height: 18.8px;

    color: var(--text-color);

    @media (min-width: 1280px) {
      font-weight: 700;
      line-height: 28.8px;
    }
  }
`;
