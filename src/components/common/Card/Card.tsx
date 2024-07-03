"use client";
import { Icon } from "../Icon";
import { IBook } from "./Card.types";
import {
  CardContainer,
  ImageContainer,
  CardLink,
  DescriptionContainer,
  Title,
  Authors,
  BottomContainer,
  Price,
  CartButton,
  BoxStyles,
} from "./Card.styles";

import FavoriteBtn from "@/components/Favorite/FavoriteBtn";

import { lazyloadExp } from "./lazyload";
import { Bookformat } from "@/components/bookformat";

const Card = ({ book, favorite }: { book: IBook; favorite: any }) => {
  const { title, url, price, author, id } = book;
  lazyloadExp();

  const isFavAlredy = favorite?.some((fav: any) => book.id === fav);

  return (
    <CardContainer>
      <ImageContainer
        className="lazyload"
        style={{ ["--background-image" as string]: `url(${url})` }}
      >
        <CardLink href={`/book/${id}`}></CardLink>
      </ImageContainer>
      <DescriptionContainer>
        <Title>
          <CardLink href={`/book/${id}`}>{title}</CardLink>
        </Title>
        <Authors>{author}</Authors>
        <Bookformat size={35} />
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
