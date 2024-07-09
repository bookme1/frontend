import styled from '@emotion/styled';

import { Wrapper } from '@/styles/globals.styles.ts';

export const StyledWrapper = styled(Wrapper)`
  height: 550px;
  margin-bottom: 80px;

  @media (min-width: 768px) {
    margin-bottom: 68px;
  }
  @media (min-width: 1280px) {
    margin-bottom: 80px;
  }
  .swiper-container {
    margin-top: 50px;
  }

  .swiper-button-prev {
    position: absolute;
    top: 0;
    right: 0;
  }

  .swiper-button-next {
    position: absolute;
    top: 0;
    right: 0;
  }
`;
