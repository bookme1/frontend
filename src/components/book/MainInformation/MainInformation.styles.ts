"use client";
import styled from "@emotion/styled";
import { Wrapper, visuallyHidden } from "@/styles/globals.styles";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import Image from "next/image";

export const ImageContainer = styled.div`
  /* width: 250px;
  height: 330px;
  margin: 0 auto;
  margin-top: 32px;
  background-image: var(--background-image);
  background-position: center;
  background-size: cover;
  border-radius: 10px;
  margin-bottom: 32px;
  @media (min-width: 768px) {
    margin-top: 0;
    margin-left: 0;
    margin-bottom: 20px;
  }
  @media (min-width: 1280px) {
    width: 502px;
    height: 660px;
  } */
`;

export const StyledImage = styled(Image)`
  width: 250px;
  height: 330px;
  margin: 0 auto;
  margin-top: 32px;
  background-image: var(--background-image);
  background-position: center;
  background-size: cover;
  border-radius: 10px;
  margin-bottom: 32px;
  @media (min-width: 768px) {
    margin-top: 0;
    margin-left: 0;
    margin-bottom: 20px;
  }
  @media (min-width: 1280px) {
    width: 502px;
    height: 660px;
  }
`;

export const HeartStyles = styled(FaHeart)`
  width: 24px;
  height: 24px;
  fill: var(--red);
  color: var(--red);
  cursor: pointer;
`;

export const HeartNotFillStyles = styled(FaRegHeart)`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export const MainInfoContainer = styled.div`
  margin-bottom: 48px;
  @media (min-width: 768px) {
    margin-bottom: 20px;
    box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    padding: 32px 40px;
    width: 457px;
    height: 330px;
    @media (min-width: 1280px) {
      width: 676px;
      height: 420px;
      position: relative;
    }
  }
`;

export const Title = styled.h1`
  font-size: 20px;
  margin-bottom: 24px;
  font-weight: 700;
  @media (min-width: 1280px) {
    font-size: 24px;
    width: 520px;
  }
`;

export const AuthorsList = styled.ul`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 32px;
  @media (min-width: 768px) {
    margin-bottom: 24px;
  }
`;

export const Author = styled.li`
  padding: 10px 16px;
  background-color: var(--gray_border);
  border-radius: 8px;
  color: white;
  font-size: 20px;
`;

export const Price = styled.p`
  font-size: 32px;
  font-weight: 700;
  font-variant-numeric: lining-nums proportional-nums;
  margin-bottom: 32px;
  text-align: center;
  @media (min-width: 768px) {
    margin-bottom: 24px;
    text-align: left;
  }
  @media (min-width: 1280px) {
    font-size: 40px;
  }
`;

export const Controls = styled.div`
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    gap: 16px;
  }
`;

export const ToCart = styled.button`
  width: 100%;
  padding: 12px 32px;
  border-radius: 8px;
  background-color: var(--red);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  @media (min-width: 768px) {
    width: 177px;
    height: 48px;
  }
`;

export const ToFavorite = styled.button`
  @media (max-width: 767.5px) {
    ${visuallyHidden};
  }
  padding: 10px;
  border-radius: 10px;
  background-color: var(--gray_border);
  color: white;
  @media (min-width: 1280px) {
    position: absolute;
    top: 32px;
    right: 40px;
    background-color: var(--gray_border);
  }
`;

export const StyledWrapper = styled(Wrapper)`
  @media (min-width: 768px) {
    display: flex;
    gap: 20px;
    margin-top: 35.5px;
  }
`;

export const InfoContainer = styled.div`
  @media (min-width: 1280px) {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
`;
