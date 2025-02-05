'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

import {
    Card,
    CardDescription,
    ControlsContainer,
    ControlsLink,
    ControlsTitle,
    IconContainer,
    SliderControls,
    StyledWrapper,
} from './Categories.styles';

import { Icon } from '../../common/Icon';

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
                    nextEl: '.arrow-right',
                    prevEl: '.arrow-left',
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
                    <Card href="/books">
                        <IconContainer></IconContainer>
                        <CardDescription>Менеджмент</CardDescription>
                    </Card>
                </SwiperSlide>
                <SwiperSlide>
                    <Card href="/books">
                        <IconContainer className="leader"></IconContainer>
                        <CardDescription>Лідерство</CardDescription>
                    </Card>
                </SwiperSlide>
                <SwiperSlide>
                    <Card href="/books">
                        <IconContainer className="brain"></IconContainer>
                        <CardDescription>саморозвиток</CardDescription>
                    </Card>
                </SwiperSlide>
                <SwiperSlide>
                    <Card href="/books">
                        <IconContainer className="svitok"></IconContainer>
                        <CardDescription>проза</CardDescription>
                    </Card>
                </SwiperSlide>
                <SwiperSlide>
                    <Card href="/books">
                        <IconContainer className="puzzle"></IconContainer>
                        <CardDescription>психологія</CardDescription>
                    </Card>
                </SwiperSlide>
                <SwiperSlide>
                    <Card href="/books">
                        <IconContainer className="kid"></IconContainer>
                        <CardDescription>дитячі</CardDescription>
                    </Card>
                </SwiperSlide>
                <SwiperSlide>
                    <Card href="/books">
                        <IconContainer className="english"></IconContainer>
                        <CardDescription>англійською</CardDescription>
                    </Card>
                </SwiperSlide>
                <SwiperSlide>
                    <Card href="/books">
                        <IconContainer></IconContainer>
                        <CardDescription>Менеджмент</CardDescription>
                    </Card>
                </SwiperSlide>
                <SwiperSlide>
                    <Card href="/books">
                        <IconContainer></IconContainer>
                        <CardDescription>Менеджмент</CardDescription>
                    </Card>
                </SwiperSlide>
            </Swiper>
        </StyledWrapper>
    );
};

export default Categories;
