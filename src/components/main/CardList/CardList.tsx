'use client';

import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import { A11y, Navigation } from 'swiper/modules';

import { BookItem } from '@/components/book/Item';
import { useGetFavoritesQuery } from '@/lib/redux/features/book/bookApi';
import { BookType } from '@/lib/redux/features/user/types';

import { Card } from '../../common/Card';
import { Icon } from '../../common/Icon';
import {
    ControlsContainer,
    ControlsLink,
    ControlsTitle,
    SliderControls,
    StyledWrapper,
} from '../Categories/Categories.styles';
import { SwiperStyle } from './CardList.styled';

const CardList = ({ name, books }: { name: string; books: any[] }) => {
    let token1 = localStorage.getItem('accessToken');

    const fav = useGetFavoritesQuery({
        accessToken: token1 ?? '',
        type: BookType.Fav,
    });

    useEffect(() => {
        fav;
    });

    const favorite = fav.data;

    let favIdList: any;
    if (typeof window !== 'undefined') {
        favIdList = localStorage.getItem('favorites');
    }
    const token = localStorage.getItem('accessToken');
    const favIdListArr = JSON.parse(favIdList);

    let booksMarkup;
    if (books?.length) {
        booksMarkup = books.map(book => (
            <SwiperStyle key={book.id}>
                <Card book={book} />
                {/* <BookItem key={book.id} book={book} /> */}
            </SwiperStyle>
        ));
    }
    return (
        <StyledWrapper>
            <SliderControls>
                <ControlsTitle>{name}</ControlsTitle>
                <ControlsContainer>
                    <ControlsLink className={`arrow-left-${name} arrow`}>
                        <Icon name="arrow_left" size={24} />
                    </ControlsLink>
                    <ControlsLink className={`arrow-right-${name} arrow`}>
                        <Icon name="arrow_right" size={24} />
                    </ControlsLink>
                </ControlsContainer>
            </SliderControls>
            <Swiper
                slidesPerView={1}
                loop={true}
                spaceBetween={16}
                modules={[Navigation, A11y]}
                className="mySwiper"
                navigation={{
                    nextEl: `.arrow-right-${name}`,
                    prevEl: `.arrow-left-${name}`,
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
        </StyledWrapper>
    );
};

export default CardList;
