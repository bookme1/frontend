"use client";
import React, { useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Icon } from "../Icon";
import {
  StyledWrapper,
  SliderControls,
  ControlsTitle,
  ControlsContainer,
  ControlsLink,
  Card,
  IconContainer,
  CardDescription,
} from "./Categories.styles";

const Categories = () => {
  return (
    <StyledWrapper>
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
      <Swiper
        slidesPerView={3}
        loop={true}
        spaceBetween={69}
        modules={[Navigation]}
        className="mySwiper"
        navigation={{
          nextEl: ".arrow-right",
          prevEl: ".arrow-left",
        }}
        breakpoints={{
          // when window width is >= 768px
          768: {
            slidesPerView: 5,
          },
          // when window width is >= 1280px
          1280: {
            slidesPerView: 7,
          },
        }}
      >
        <SwiperSlide>
          <Card href="#">
            <IconContainer></IconContainer>
            <CardDescription>Менеджмент</CardDescription>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card href="#">
            <IconContainer className="leader"></IconContainer>
            <CardDescription>Лідерство</CardDescription>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card href="#">
            <IconContainer className="brain"></IconContainer>
            <CardDescription>саморозвиток</CardDescription>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card href="#">
            <IconContainer className="svitok"></IconContainer>
            <CardDescription>проза</CardDescription>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card href="#">
            <IconContainer className="puzzle"></IconContainer>
            <CardDescription>психологія</CardDescription>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card href="#">
            <IconContainer className="kid"></IconContainer>
            <CardDescription>дитячі</CardDescription>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card href="#">
            <IconContainer className="english"></IconContainer>
            <CardDescription>англійською</CardDescription>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card href="#">
            <IconContainer></IconContainer>
            <CardDescription>Менеджмент</CardDescription>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card href="#">
            <IconContainer></IconContainer>
            <CardDescription>Менеджмент</CardDescription>
          </Card>
        </SwiperSlide>
      </Swiper>
    </StyledWrapper>
  );
};

export default Categories;
