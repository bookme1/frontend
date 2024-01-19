"use client";
import { Card } from "../Card";
import {
  StyledWrapper,
  SliderControls,
  ControlsTitle,
  ControlsContainer,
  ControlsLink,
} from "../Categories/Categories.styles";
import { Icon } from "../Icon";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const CardList = ({ name }: { name: string }) => {
  return (
    <StyledWrapper>
      <SliderControls>
        <ControlsTitle>{name}</ControlsTitle>
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
        slidesPerView={2}
        loop={true}
        spaceBetween={16}
        modules={[Navigation]}
        className="mySwiper"
        navigation={{
          nextEl: ".arrow-right",
          prevEl: ".arrow-left",
        }}
        breakpoints={{
          // when window width is >= 768px
          768: {
            slidesPerView: 3,
            spaceBetween: 13,
          },
          // when window width is >= 1280px
          1280: {
            slidesPerView: 5,
            spaceBetween: 13,
          },
        }}
      >
        <SwiperSlide className="ml-[1px]">
          <Card />
        </SwiperSlide>
        <SwiperSlide>
          <Card />
        </SwiperSlide>
        <SwiperSlide>
          <Card />
        </SwiperSlide>
        <SwiperSlide>
          <Card />
        </SwiperSlide>
        <SwiperSlide>
          <Card />
        </SwiperSlide>
        <SwiperSlide>
          <Card />
        </SwiperSlide>
        <SwiperSlide>
          <Card />
        </SwiperSlide>
        <SwiperSlide>
          <Card />
        </SwiperSlide>
      </Swiper>
    </StyledWrapper>
  );
};

export default CardList;
