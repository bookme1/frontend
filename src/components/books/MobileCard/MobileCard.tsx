"use client";
import { Icon } from "@/components/common/Icon";
import { Wrapper } from "@/styles/globals.styles";
import styled from "@emotion/styled";

const StyledWrapper = styled(Wrapper)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const ImageContainer = styled.div`
  width: 120px;
  height: 150px;
  background-image: var(--background-image);
  background-position: center;
  background-size: cover;
`;

const ContentContainer = styled.div`
  width: 207px;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const AuthorsList = styled.p`
  color: var(--gray);
  font-size: 15px;
  margin-bottom: 35px;
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Controls = styled.div`
  display: flex;
  gap: 24px;
`;

const Price = styled.p`
  font-variant-numeric: lining-nums proportional-nums;
  font-size: 20px;
  font-weight: 700;
`;

const HeartButton = styled.button``;

const CartButton = styled.button`
  border-radius: 4px;
  background-color: var(--red);
  padding: 10px;
`;

const MobileCard = ({book}) => {
  // const mockBook = {
  //   title: "Я бачу, вас цікавить пітьма",
  //   url: "https://static.yakaboo.ua/media/cloudflare/product/webp/600x840/y/a/ya_bachu_vas_cikavytj_pitjma_cover_full.jpg",
  //   price: 199,
  //   authors: "Бессер Ван, Дер Колк",
  // };
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
