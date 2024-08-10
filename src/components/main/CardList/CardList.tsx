'use client';

import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';



import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';



import { BookType } from '@/lib/redux/features/user/types';
import { useGetFavoritesQuery } from '@/lib/redux/features/user/userApi';



import { Card } from '../../common/Card';
import { Icon } from '../../common/Icon';
import { ControlsContainer, ControlsLink, ControlsTitle, SliderControls, StyledWrapper } from '../Categories/Categories.styles';


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
      <SwiperSlide key={book.id}>
        <Card
          book={book}
           />
      </SwiperSlide>
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
        modules={[Navigation]}
        className="mySwiper"
        navigation={{
          nextEl: `.arrow-right-${name}`,
          prevEl: `.arrow-left-${name}`,
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