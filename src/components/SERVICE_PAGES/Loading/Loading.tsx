'use client';

import React from 'react';

import loaderData from '/src/assets/book_animation.json';

import {
  CenteringLogo,
  Content,
  StyledIcon,
  StyledLottie,
  Wrapper,
} from './Loading.style';

const Loading = () => {
  return (
    <Wrapper>
      <Content>
        <StyledLottie animationData={loaderData} loop={true} />
        <CenteringLogo>
          <a href="/">
            <StyledIcon name="logo_black" />
          </a>
        </CenteringLogo>
      </Content>
    </Wrapper>
  );
};

export default Loading;
