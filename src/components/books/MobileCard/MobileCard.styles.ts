"use client";
import { Wrapper } from "@/styles/globals.styles";
import styled from "@emotion/styled";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

export const StyledWrapper = styled(Wrapper)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 24px;
`;

export const HeartStyles = styled(FaHeart)`
  width: 24px;
  height: 24px;
  fill: var(--red);
  color: var(--red);
`;

export const HeartNotFillStyles = styled(FaRegHeart)`
  width: 24px;
  height: 24px;
`;

export const ImageContainer = styled.div`
  width: 120px;
  height: 150px;

  background-image: var(--background-image);
  background-position: center;
  background-size: cover;
  @media (min-width: 1280px) {
    width: 230px;
    height: 288px;
  }
`;

export const ContentContainer = styled.div`
  width: 207px;
`;

export const Title = styled.h3`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 3; /* Ограничивает количество строк до 3 */
  height: 75.6px;
`;

export const AuthorsList = styled.p`
  color: var(--gray);
  font-size: 15px;
  margin-bottom: 35px;
`;

export const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const Price = styled.p`
  font-variant-numeric: lining-nums proportional-nums;
  font-size: 20px;
  font-weight: 700;
`;

export const HeartButton = styled.button``;

export const CartButton = styled.button`
  border-radius: 4px;
  background-color: var(--red);
  padding: 10px;
`;
