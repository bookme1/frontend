"use client";
import { Wrapper } from "@/styles/globals.styles";
import {
  Author,
  StyledWrapper,
  ImageContainer,
  InfoContainer,
  MainInfoContainer,
  Title,
  Price,
  AuthorsList,
  Controls,
  ToCart,
  ToFavorite,
  HeartNotFillStyles,
} from "./MainInformation.styles";
import { Icon } from "@/components/common/Icon";
import { Characteristics } from "../Characteristics";
import { ICharacteristics } from "../Characteristics/Characteristics.types";
import { useWindowSize } from "@/hooks/useWindowSize";
import { HeartFillStyles } from "@/components/common/Card/Card.styles";
import { useDispatch, useSelector } from "react-redux";
import {
  AddToFavorite,
  GetFromFavorite,
  fetchAllBooks,
  selectBooks,
  selectFavorite,
} from "@/lib/redux";
import { useEffect, useState } from "react";
import FavoriteBtn from "@/components/Favorite/FavoriteBtn";
import { usePathname } from "next/navigation";
import Bookformat from "@/components/BookFormat/BookFormat";
import { IBook } from "@/app/book/[id]/page.types";
import { Formats } from "../Formats";
import { bookService } from "@/api/book/bookService";

const MainInformation = ({
  book,
  characteristics,
}: {
  book: IBook;
  characteristics: ICharacteristics;
}) => {
  const dispatch: any = useDispatch();
  const favorite = useSelector(selectFavorite);
  const router = usePathname();

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  const booksList = useSelector(selectBooks);

  const id = router?.split("/").pop();

  const screenWidth = useWindowSize().width;
  const getAuthorsMarkup = (authors: string) => {
    if (authors === undefined) return;
    const authorsArr = authors.split(", ");
    return authorsArr.map((author) => {
      return <Author key={author}>{author}</Author>;
    });
  };
  const authorsMarkup = getAuthorsMarkup(book.author);
  const isFavAlredy = favorite[0]?.some((fav: any) => fav === id);
  // const isFavAlredy = favorite[0]?.find((book: any) => book.includes(id));
  // console.log(isFavAlredy);
  // console.log(favorite);

  return (
    <>
      <StyledWrapper>
        <ImageContainer
          style={{ ["--background-image" as string]: `url(${book?.url})` }}
        ></ImageContainer>
        <InfoContainer>
          <MainInfoContainer>
            <Title>{book?.title}</Title>
            <AuthorsList>{authorsMarkup}</AuthorsList>
            <Price>{book?.price} ₴</Price>
            <Controls>
              <ToCart>
                <Icon name="cart" size={28} />В кошик
              </ToCart>
              <ToCart
                onClick={() => {
                  bookService.makeTestCheckout(book.price);
                }}
              >
                Купити зараз
              </ToCart>
              <ToFavorite>
                <FavoriteBtn book={book} isFavAlredy={isFavAlredy} />
              </ToFavorite>
            </Controls>
            <Formats pdf={true} mobi={true} epub={false} />
          </MainInfoContainer>
          {screenWidth && (screenWidth < 768 || screenWidth >= 1280) && (
            <Characteristics characteristics={characteristics} />
          )}
        </InfoContainer>
      </StyledWrapper>
      {screenWidth && screenWidth >= 768 && screenWidth < 1280 && (
        <Wrapper>
          <Characteristics characteristics={characteristics} />
        </Wrapper>
      )}
    </>
  );
};

export default MainInformation;
