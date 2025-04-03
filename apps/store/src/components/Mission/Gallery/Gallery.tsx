import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import Image from 'next/image';
import { HashNavigation, Navigation, Pagination } from 'swiper/modules';

import styles from './Gallery.module.css';

import { SwiperList } from '../../main/SwiperList';
import Slider from '../Slider/Slider';

const Gallery = () => {
    return (
        <section className={styles.gallerySection} id="gallery">
            <h2 className={styles.title}>Фотогалерея</h2>
            <Slider />
        </section>
    );
};

export default Gallery;
