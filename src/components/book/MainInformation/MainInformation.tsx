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
} from "./MainInformation.styles";
import { Icon } from "@/components/common/Icon";
import { Characteristics } from "../Characteristics";
import { ICharacteristics } from "../Characteristics/Characteristics.types";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useSelector } from "react-redux";
import { selectBooks, selectFavorite } from "@/lib/redux";
import FavoriteBtn from "@/components/Favorite/FavoriteBtn";
import { usePathname } from "next/navigation";
import { IBook } from "@/app/book/[id]/page.types";
import { Formats } from "../Formats";
import { bookService } from "@/api/book/bookService";
import { useGetBooksQuery } from "@/lib/redux/features/book/bookApi";
import { useGetUserBooksQuery } from "@/lib/redux/features/user/userApi";
import { BookType } from "@/lib/redux/features/user/types";
import { useEffect } from "react";

const MainInformation = ({
  book,
  characteristics,
}: {
  book: IBook;
  characteristics: ICharacteristics;
}) => {

  const router = usePathname();

  const id = router?.split("/").pop();

 let token;
  if (typeof window !== "undefined") {
  token = localStorage.getItem('accessToken');
  }


  const fav = useGetUserBooksQuery({
    accessToken: token ?? '',
    type: BookType.Fav,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
    fav;}
  },[fav]);

  const favorite = fav.data;

  const screenWidth = useWindowSize().width;
  const getAuthorsMarkup = (authors: string) => {
    if (authors === undefined) return;
    const authorsArr = authors.split(", ");
    return authorsArr.map((author) => {
      return <Author key={author}>{author}</Author>;
    });
  };
  const authorsMarkup = getAuthorsMarkup(book.author);

  let isFavAlredy=[]
if (Array.isArray(favorite)){
  isFavAlredy = favorite?.some((fav: any) => fav === id);
}

  


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
