'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import { A11y, Navigation } from 'swiper/modules';

import style from './CardList.module.css';
import BookItem from '@/components/book/Item/BookItem';
import { IUser } from '@/lib/redux/features/user/types';

import { Icon } from '../../common/Icon';

const CardList = ({
    name,
    books,
    id,
    user,
}: {
    name: string;
    books: any[];
    id: number;
    user: IUser | null;
}) => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        setWidth(window.innerWidth);
    }, []);

    let booksMarkup;
    if (books?.length) {
        booksMarkup = books.map(book => (
            <SwiperSlide key={book.id} className={style.swiperStyle}>
          
                <BookItem
                    key={book.id}
                    book={book}
                    isSwiper={true}
                    user={user}
                />
            </SwiperSlide>
        ));
    }

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

            {width > 0 && (
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
            )}
        </div>
    );
};

export default CardList;
