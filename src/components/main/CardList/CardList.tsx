'use client';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import { A11y, Navigation } from 'swiper/modules';

import style from './CardList.module.css';

import { Card } from '../../common/Card';
import { Icon } from '../../common/Icon';

const CardList = ({
    name,
    books,
    id,
}: {
    name: string;
    books: any[];
    id: number;
}) => {
    // const favorite = fav.data;

    // let favIdList: any;
    // if (typeof window !== 'undefined') {
    //     favIdList = localStorage.getItem('favorites');
    // }
    // const favIdListArr = JSON.parse(favIdList) && null;

    let booksMarkup;
    if (books?.length) {
        booksMarkup = books.map(book => (
            <SwiperSlide key={book.id} className={style.swiperStyle}>
                <Card book={book} />
                {/* <BookItem key={book.id} book={book} /> */}
            </SwiperSlide>
        ));
    }

    const width = typeof window !== 'undefined' ? window.innerWidth : 0;

    let setLoop = true;
    let isChevronVisible = true;

    if (width >= 768 && books.length < 3) {
        setLoop = false;
        isChevronVisible = false;
    } else if (width >= 1280 && books.length < 5) {
        setLoop = false;
        isChevronVisible = false;
    }

    return (
        <div className={style.wrapper}>
            <div className={style.sliderControls}>
                <h2 className={style.controlsTitle}>{name}</h2>
                {isChevronVisible && (
                    <div className={style.controlsContainer}>
                        <a
                            className={`arrow-left-${id} arrow ${style.controlsLink}`}
                        >
                            <Icon name="arrow_left" size={24} />
                        </a>
                        <a
                            className={`arrow-right-${id} arrow ${style.controlsLink}`}
                        >
                            <Icon name="arrow_right" size={24} />
                        </a>
                    </div>
                )}
            </div>
            <Swiper
                slidesPerView={1}
                loop={setLoop}
                spaceBetween={16}
                modules={[Navigation, A11y]}
                className="mySwiper"
                navigation={{
                    nextEl: `.arrow-right-${id}`,
                    prevEl: `.arrow-left-${id}`,
                }}
                a11y={{
                    enabled: true,
                    prevSlideMessage: 'Попередній слайд',
                    nextSlideMessage: 'Наступний слайд',
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
                {booksMarkup || ''}
            </Swiper>
        </div>
    );
};

export default CardList;
