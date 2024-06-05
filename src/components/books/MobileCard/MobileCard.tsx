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

const MobileCard = ({ book }: { book: any }) => {
  return (
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
            <FavoriteBtn book={book} isFavAlredy={false} />
            <CartButton>
              <Icon name="cart" size={24} color="#fff" />
            </CartButton>
          </Controls>
        </BottomContainer>
      </ContentContainer>
    </StyledWrapper>
  );
};

export default MobileCard;
