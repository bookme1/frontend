"use client";
import styled from "@emotion/styled";
import management from "@/assets/categories/management.webp";
import leader from "@/assets/categories/leader.webp";
import brain from "@/assets/categories/brain.webp";
import svitok from "@/assets/categories/svitok.webp";
import puzzle from "@/assets/categories/puzzle.webp";
import kid from "@/assets/categories/kid.webp";
import english from "@/assets/categories/english.webp";
import { Wrapper } from "@/styles/globals.styles";

export const SwiperWrapper = styled.div``;

export const Card = styled.a`
  margin-top: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;
export const IconContainer = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 120px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  background-image: url(${management.src});
  &.leader {
    background-image: url(${leader.src});
  }
  &.brain {
    background-image: url(${brain.src});
  }
  &.svitok {
    background-image: url(${svitok.src});
  }
  &.puzzle {
    background-image: url(${puzzle.src});
  }
  &.kid {
    background-image: url(${kid.src});
  }
  &.english {
    background-image: url(${english.src});
  }
`;
export const CardDescription = styled.h2`
  text-transform: capitalize;
`;

export const SliderControls = styled.div`
  margin-bottom: 50px;
  display: flex;
  justify-content: space-between;
`;

export const ControlsTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
`;

export const ControlsLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 100px;
  opacity: 0.9;
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.15s cubic-bezier(0.17, 0.67, 0.83, 0.67);
  :hover {
    background-color: #e6e6e6;
  }
  :active {
    background-color: #cccccc;
  }
`;

export const ControlsContainer = styled.div`
  display: flex;
  gap: 64px;
`;

export const StyledWrapper = styled(Wrapper)`
  margin-bottom: 80px;
  @media (min-width: 768px) {
    margin-bottom: 120px;
  }
  @media (min-width: 1280px) {
    margin-bottom: 132px;
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
