"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import styled from "@emotion/styled";
import management from "@/assets/categories/management.webp";
import leader from "@/assets/categories/leader.webp";
import brain from "@/assets/categories/brain.webp";
import svitok from "@/assets/categories/svitok.webp";
import puzzle from "@/assets/categories/puzzle.webp";
import kid from "@/assets/categories/kid.webp";
import english from "@/assets/categories/english.webp";
import { Icon } from "../Icon";
import { Wrapper } from "@/styles/globals.styles";

const MySwiper = styled(Swiper)`
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

const Card = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;
const IconContainer = styled.div`
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
const CardDescription = styled.h2`
  text-transform: capitalize;
`;

const SliderControls = styled.div`
  margin-bottom: 50px;
  display: flex;
  justify-content: space-between;
`;

const ControlsTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
`;

const ControlsLink = styled.a`
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

const ControlsContainer = styled.div`
  display: flex;
  gap: 64px;
`;

const Categories = () => {
  return (
    <Wrapper>
      <SliderControls>
        <ControlsTitle>Категорії</ControlsTitle>
        <ControlsContainer>
          <ControlsLink className="arrow-left arrow">
            <Icon name="arrow_left" size={24} />
          </ControlsLink>
          <ControlsLink className="arrow-right arrow">
            <Icon name="arrow_right" size={24} />
          </ControlsLink>
        </ControlsContainer>
      </SliderControls>
      <MySwiper
        slidesPerView={7}
        loop={true}
        spaceBetween={69}
        modules={[Navigation]}
        className="mySwiper"
        navigation={{
          nextEl: ".arrow-right",
          prevEl: ".arrow-left",
        }}
      >
        <SwiperSlide>
          <Card>
            <IconContainer></IconContainer>
            <CardDescription>Менеджмент</CardDescription>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card>
            <IconContainer className="leader"></IconContainer>
            <CardDescription>Лідерство</CardDescription>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card>
            <IconContainer className="brain"></IconContainer>
            <CardDescription>саморозвиток</CardDescription>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card>
            <IconContainer className="svitok"></IconContainer>
            <CardDescription>проза</CardDescription>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card>
            <IconContainer className="puzzle"></IconContainer>
            <CardDescription>психологія</CardDescription>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card>
            <IconContainer className="kid"></IconContainer>
            <CardDescription>дитячі</CardDescription>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card>
            <IconContainer className="english"></IconContainer>
            <CardDescription>англійською</CardDescription>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card>
            <IconContainer></IconContainer>
            <CardDescription>Менеджмент</CardDescription>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card>
            <IconContainer></IconContainer>
            <CardDescription>Менеджмент</CardDescription>
          </Card>
        </SwiperSlide>
      </MySwiper>
    </Wrapper>
  );
};

export default Categories;
