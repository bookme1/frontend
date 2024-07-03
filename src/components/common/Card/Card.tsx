'use client';

import {
  Authors,
  BookFormatContainer,
  BottomContainer,
  BoxStyles,
  CardContainer,
  CardLink,
  CartButton,
  DescriptionContainer,
  ImageContainer,
  Price,
  Title,
} from './Card.styles';
import { IBook } from './Card.types';
import { lazyloadExp } from './lazyload';
import Bookformat from '@/components/BookFormat/BookFormat';
import FavoriteBtn from '@/components/Favorite/FavoriteBtn';

import { Icon } from '../Icon';

const Card = ({ book, favorite }: { book: IBook; favorite: any }) => {
  const { title, url, price, author, id } = book;
  lazyloadExp();
  
  const isFavAlredy = favorite?.some((fav: any) => book.id === fav);

  return (
    <CardContainer>
      <ImageContainer
        className="lazyload"
        style={{ ['--background-image' as string]: `url(${url})` }}
      >
        <CardLink href={`/book/${id}`}></CardLink>
      </ImageContainer>
      <DescriptionContainer>
        <Title>
          <CardLink href={`/book/${id}`}>{title}</CardLink>
        </Title>
        <Authors>{author}</Authors>
        <BookFormatContainer className="bookformat">
          <Bookformat size={35} />
        </BookFormatContainer>
        <BottomContainer>
          <Price>{price}₴</Price>
          <BoxStyles className="hidden-buttons">
            <FavoriteBtn book={book} isFavAlredy={isFavAlredy} />
            <CartButton>
              <Icon name="cart" size={24} color="white" />
            </CartButton>
          </BoxStyles>
        </BottomContainer>
      </DescriptionContainer>
    </CardContainer>
  );
};

export default Card;