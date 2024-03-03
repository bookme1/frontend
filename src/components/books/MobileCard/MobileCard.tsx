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
  HeartButton,
  CartButton,
} from "./MobileCard.styles";

const MobileCard = ({ book }: { book: any }) => {
  return (
    <StyledWrapper>
      <ImageContainer
        style={{ ["--background-image" as string]: `url(${book.url})` }}
      ></ImageContainer>
      <ContentContainer>
        <Title>{book.title}</Title>
        <AuthorsList>{book.authors}</AuthorsList>
        <BottomContainer>
          <Price>{book.price} ₴</Price>
          <Controls>
            <HeartButton>
              <Icon name="heart" size={24} />
            </HeartButton>
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
