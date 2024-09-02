"use client";
import { Icon } from "@/components/common/Icon";
import {
  StyledWrapper,
  ImageContainer,
  ContentContainer,
  Title,
  AuthorsList,
  BottomContainer,
  Price,
  Controls,
  CartButton,
} from "./MobileCard.styles";

import FavoriteBtn from "@/components/Favorite/FavoriteBtn";
import { CardLink } from "@/components/common/Card/Card.styles";
import { openModal, useDispatch, useSelector } from "@/lib/redux";
import { useState } from "react";
import { useAddBookQuery } from "@/lib/redux/features/user/userApi";
import { BookType } from "@/lib/redux/features/user/types";



const MobileCard = ({ book }: { book: any }) => {

  const [addClick, setAddClick] = useState(false);
  const token = localStorage.getItem("accessToken");
 
  const addCardBook = useAddBookQuery({
    accessToken: token ?? "",
    bookId: book.id ?? "",
    type: BookType.Cart,
  }, {skip: addClick===false});

  const dispatch = useDispatch();

// Додана функція для обробки обраних книг
  const handleToggleFavorite = (isFav: boolean) => {
    console.log(`Book ${book.id} is ${isFav ? 'added to' : 'removed from'} favorites`);
  };

  const handleOpenModal = (modalName: string) => {
    dispatch(openModal(modalName));
    setAddClick(true);
  };
  return (
    <>
    <StyledWrapper>
      <ImageContainer
        style={{ ["--background-image" as string]: `url(${book.url})` }}
      >
        <CardLink href={`book/${book.id}`}></CardLink>
      </ImageContainer>
      <ContentContainer>
        <Title>
          <CardLink href={`book/${book.id}`}>{book.title}</CardLink>
        </Title>

        <AuthorsList>{book.authors}</AuthorsList>
        <BottomContainer>
          <Price>{book.price} ₴</Price>
          <Controls>
              <FavoriteBtn book={book}
                isFavAlready={false}
                onToggleFavorite={handleToggleFavorite}  // Переданий пропс onToggleFavorite
              />
            <CartButton onClick={()=>{handleOpenModal('successInfo')}}>
              <Icon name="cart" size={24} color="#fff" />
            </CartButton>
          </Controls>
        </BottomContainer>
      </ContentContainer>
    </StyledWrapper>
 
      </>
  );
};

export default MobileCard;
