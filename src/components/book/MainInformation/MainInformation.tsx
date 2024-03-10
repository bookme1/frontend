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
import { useDispatch } from "react-redux";
import { AddToFavorite, RemoveFavorite } from "@/lib/redux";
import { useState } from "react";

const MainInformation = ({
  authors,
  url,
  name,
  price,
  characteristics,
}: {
  authors: string;
  url: string;
  name: string;
  price: number;
  characteristics: ICharacteristics;
}) => {
 

  const screenWidth = useWindowSize().width;
  const getAuthorsMarkup = (authors: string) => {
    if (authors === undefined) return;
    const authorsArr = authors.split(", ");
    return authorsArr.map((author) => {
      return <Author key={author}>{author}</Author>;
    });
  };
  const authorsMarkup = getAuthorsMarkup(authors);

  const dispatch = useDispatch();
  const [isFavorite, setIsFavotire] = useState(false);

  const handleFavoriteClick = () => {
    // dispatch(AddToFavorite(book));
    setIsFavotire(!isFavorite);
  };

  const handleNotFavoriteClick = () => {
    // dispatch(RemoveFavorite(book));
    setIsFavotire(!isFavorite);
  };

  return (
    <>
      <StyledWrapper>
        <ImageContainer
          style={{ ["--background-image" as string]: `url(${url})` }}
        ></ImageContainer>
        <InfoContainer>
          <MainInfoContainer>
            <Title>{name}</Title>
            <AuthorsList>{authorsMarkup}</AuthorsList>
            <Price>{price} ₴</Price>
            <Controls>
              <ToCart>
                <Icon name="cart" size={28} />
                Придбати
              </ToCart>
              <ToFavorite>
                {/* <Icon name="heart" size={28} /> */}

                {isFavorite ? (
                  <HeartFillStyles onClick={handleNotFavoriteClick} />
                ) : (
                  <HeartNotFillStyles onClick={handleFavoriteClick} />
                )}
              </ToFavorite>
            </Controls>
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
