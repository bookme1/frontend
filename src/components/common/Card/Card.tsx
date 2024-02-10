"use client";
import styled from "@emotion/styled";
import { Icon } from "../Icon";
import Link from "next/link";

const CardContainer = styled.li`
  margin: 2px 0px;
  width: 230px;
  border-radius: 10px;
  list-style: none;
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.25);
`;

const ImageContainer = styled.div`
  background-image: var(--background-image);
  width: 100%;
  height: 288px;
  background-position: center;
  background-size: cover;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-bottom: 8px;
`;

const DescriptionContainer = styled.div`
  padding: 0px 12px 12px;
`;

const CardLink = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
`;

const Title = styled.p`
  font-size: 18px;
  line-height: 140%;
  font-weight: 700;
  margin-bottom: 12px;
`;

const Authors = styled.p`
  color: var(--gray);
  font-size: 15px;
  line-height: 140%;
  margin-bottom: 8px;
`;

const BottomContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Price = styled.p`
  font-size: 20px;
  font-weight: 700;
  font-variant-numeric: lining-nums proportional-nums;
`;

const HeartButton = styled.button`
  margin-left: 62px;
  margin-right: 24px;
`;

const CartButton = styled.button`
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: var(--red);
`;

interface IBook {
  id: number;
  title: string;
  url: string;
  price: number;
  author: string;
}

const Card = ({ book }: { book: IBook }) => {
  const { title, url, price, author, id } = book;
  return (
    <CardContainer>
      <ImageContainer
        style={{ ["--background-image" as string]: `url(${url})` }}
      >
        <CardLink href={`book/${id}`}></CardLink>
      </ImageContainer>
      <DescriptionContainer>
        <Title>
          <CardLink href={`book/${id}`}>{title}</CardLink>
        </Title>
        <Authors>{author}</Authors>
        <BottomContainer>
          <Price>{price} ₴</Price>
          <HeartButton>
            <Icon name="heart" size={24} />
          </HeartButton>
          <CartButton>
            <Icon name="cart" size={24} color="white" />
          </CartButton>
        </BottomContainer>
      </DescriptionContainer>
    </CardContainer>
  );
};

export default Card;
