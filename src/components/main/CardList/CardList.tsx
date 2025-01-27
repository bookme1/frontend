'use client';

import { useEffect } from 'react';
import { Swiper } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import { A11y, Navigation } from 'swiper/modules';

import { SwiperStyle } from './CardList.styled';
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

const CardList = ({
    name,
    books,
    id,
}: {
    name: string;
    books: any[];
    id: number;
}) => {
    const fav = useGetFavoritesQuery({
        accessToken: '',
        type: BookType.Fav,
    });

    useEffect(() => {
        fav;
    });

    // const favorite = fav.data;

    // let favIdList: any;
    // if (typeof window !== 'undefined') {
    //     favIdList = localStorage.getItem('favorites');
    // }
    // const favIdListArr = JSON.parse(favIdList) && null;

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
                    <ControlsLink className={`arrow-left-${id} arrow`}>
                        <Icon name="arrow_left" size={24} />
                    </ControlsLink>
                    <ControlsLink className={`arrow-right-${id} arrow`}>
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
        </StyledWrapper>
    );
};

export default CardList;
