"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import styled from "@emotion/styled";
import management from "@/assets/categories/management.webp";

const MySwiper = styled(Swiper)`
  .swiper-container {
    margin-top: 50px;
    position: relative;
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
`;
const CardDescription = styled.p``;

const Categories = () => {
  return (
    <>
      <MySwiper
        slidesPerView={7}
        loop={true}
        spaceBetween={69}
        modules={[Navigation]}
        className="mySwiper"
        navigation={{
          nextEl: ".arrow-left",
          prevEl: ".arrow-right",
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
      <button className="arrow-left arrow">Prev</button>
      <button className="arrow-right arrow">next</button>
    </>
  );
};

export default Categories;
