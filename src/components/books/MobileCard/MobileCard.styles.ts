"use client";
import { Wrapper } from "@/styles/globals.styles";
import styled from "@emotion/styled";

export const StyledWrapper = styled(Wrapper)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 24px;
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