"use client";

import styled from "@emotion/styled";
import { GoTrash } from "react-icons/go";
import Image from "next/image";

export const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
height: 748px;
width: 375px;
padding: 16px;

position: relative;


@media (min-width: 768px) {
    padding: 24px;
  width: 494px;
  height: 959px;
  }

@media (min-width: 1280px) {

  width: 494px;
  height: 695px;


  }
`;

export const CartBtn = styled.button`
  margin-top: 16px;

  width: 343px;
  height: 46px;
  background-color: var(--red);
  border-radius: 8px;
  font-size: 16px;
  color: #fff;
  font-weight: 700;
  transition: background-color 0.15s cubic-bezier(0.17, 0.67, 0.83, 0.67);
  :hover {
    background-color: #e62e2e;
  }
  :active {
    background-color: #cc2929;
  }
  @media (min-width: 768px) {
    width: 446px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;

    margin-top: 32px;
  }
  @media (min-width: 1280px) {
    font-size: 16px;
  
  }
;
`

export const FooterBox = styled.div`

margin: auto 0 0;
max-height: 117px;

@media (min-width: 768px) {
  max-height: 154px;
  }

@media (min-width: 1280px) {

  }
`;

export const SpanBox = styled.div`

display: flex;
    justify-content: space-between;
    align-items: center;


@media (min-width: 768px) {

  }

@media (min-width: 1280px) {

  }
`;

export const Text = styled.span`

font-size: 20px;
font-weight: 700;
text-align: center;



@media (min-width: 768px) {
    font-size: 24px;
  }

@media (min-width: 1280px) {

  }
`;

export const Title = styled.p`

font-size: 16px;
font-weight: 700;



@media (min-width: 768px) {
  font-size: 20px;
  }
`;

export const Author = styled.p`

font-size: 16px;
font-weight: 500;
color: #6E646D;
`;

export const Price = styled.p`

font-size: 24px;
font-weight: 700;

`;

export const StyledImage = styled(Image)`
  width: 120px;
  height: 160px;
 border-radius: 10px;

 object-fit: contain;

`;

export const DataBox = styled.div`

/* display:flex;
flex-direction: column; */



`;

export const ItemBox = styled.li`
margin-top: 32px;
position: relative;
list-style: none;
max-height: 631px;
overflow-y: auto;
display:flex;
gap: 20px;
padding: 20px 0;

@media (min-width: 768px) {
  padding: 24px 0;
  max-height: 805px;
  }

  @media (min-width: 1280px) {
    max-height: 541px;
}
`;

export const ListBox = styled.ul`
max-height: 631px;
overflow-y: auto;


@media (min-width: 768px) {

  max-height: 805px;
  }

  @media (min-width: 1280px) {
    max-height: 541px;
}
`;

export const Trash = styled(GoTrash)`
width: 24px;
height: 24px;
fill: #6E646D;

position: absolute;
top:24px;
right: 0;

cursor: pointer;
`;

