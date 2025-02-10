import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import Image from 'next/image';
import SwiperCore from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

import styles from './Slider.module.css';

import slide1 from '../../../assets/mission/slide1.webp';
import slide2 from '../../../assets/mission/slide2.webp';
import slide3 from '../../../assets/mission/slide3.webp';
import slide4 from '../../../assets/mission/slide4.webp';

SwiperCore.use([Navigation, Pagination]);

const Slider = () => {
    const slides = [
        {
            image: slide1,
            date: '2025-02-06',
            text: 'Наше майбутнє в наших руках.',
        },
        {
            image: slide2,
            date: '2025-02-07',
            text: 'Наше майбутнє в наших руках.',
        },
        {
            image: slide3,
            date: '2025-02-08',
            text: 'Наше майбутнє  у наших руках.',
        },
        {
            image: slide4,
            date: '2025-02-09',
            text: 'Описание четвертого слайда',
        },
    ];

    return (
        <div className={styles.swiperContainer}>
            <Swiper
                spaceBetween={20}
                navigation={true}
                loop={true}
                slidesPerView={3}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className={styles.slideContent}>
                            <Image
                                className={styles.slideImage}
                                src={slide.image}
                                alt={`slide ${index + 1}`}
                                layout="responsive"
                                width={382}
                                height={245}
                            />
                            <div className={styles.slideText}>
                                <p className={styles.slideDescription}>
                                    {slide.date}
                                </p>
                                <p className={styles.slideDescription}>
                                    {slide.text}
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Slider;
