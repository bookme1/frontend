'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

import styles from './Categories.module.css';

import { Icon } from '../../common/Icon';

const Categories = () => {
    return (
        <div className={`${styles.styledWrapper} ${styles.wrapper}`}>
            <div className={styles.sliderControls}>
                <h2 className={styles.controlsTitle}>Категорії</h2>
                <div className={styles.controlsContainer}>
                    <a className={`${styles.controlsLink} arrow-left arrow`}>
                        <Icon name="arrow_left" size={24} />
                    </a>
                    <a className={`${styles.controlsLink} arrow-right arrow`}>
                        <Icon name="arrow_right" size={24} />
                    </a>
                </div>
            </div>
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
                    768: {
                        slidesPerView: 5,
                    },
                    1280: {
                        slidesPerView: 7,
                    },
                }}
            >
                <SwiperSlide>
                    <a href="/books" className={styles.card}>
                        <div
                            className={`${styles.iconContainer} ${styles.management}`}
                        ></div>
                        <h2 className={styles.cardDescription}>Менеджмент</h2>
                    </a>
                </SwiperSlide>
                <SwiperSlide>
                    <a href="/books" className={styles.card}>
                        <div
                            className={`${styles.iconContainer} ${styles.leader}`}
                        ></div>
                        <h2 className={styles.cardDescription}>Лідерство</h2>
                    </a>
                </SwiperSlide>
                <SwiperSlide>
                    <a href="/books" className={styles.card}>
                        <div
                            className={`${styles.iconContainer} ${styles.brain}`}
                        ></div>
                        <h2 className={styles.cardDescription}>Саморозвиток</h2>
                    </a>
                </SwiperSlide>
                <SwiperSlide>
                    <a href="/books" className={styles.card}>
                        <div
                            className={`${styles.iconContainer} ${styles.svitok}`}
                        ></div>
                        <h2 className={styles.cardDescription}>Проза</h2>
                    </a>
                </SwiperSlide>
                <SwiperSlide>
                    <a href="/books" className={styles.card}>
                        <div
                            className={`${styles.iconContainer} ${styles.puzzle}`}
                        ></div>
                        <h2 className={styles.cardDescription}>Психологія</h2>
                    </a>
                </SwiperSlide>
                <SwiperSlide>
                    <a href="/books" className={styles.card}>
                        <div
                            className={`${styles.iconContainer} ${styles.kid}`}
                        ></div>
                        <h2 className={styles.cardDescription}>Дитячі</h2>
                    </a>
                </SwiperSlide>
                <SwiperSlide>
                    <a href="/books" className={styles.card}>
                        <div
                            className={`${styles.iconContainer} ${styles.english}`}
                        ></div>
                        <h2 className={styles.cardDescription}>Англійською</h2>
                    </a>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Categories;
