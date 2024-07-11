"use client";

import styled from "@emotion/styled";
import success from '@/assets/modal/success.png';


export const Container = styled.div`
display: flex;
height: 695px;
width: 375px;

background: center no-repeat url(${success.src});
background-position-y: 35%;
background-size: 124px 129px;

@media (min-width: 768px) {
  background-position-y: 40%;
  width: 494px;
  height: 812px;
  }

@media (min-width: 1280px) {

  width: 494px;
  height: 959px;
  }
`;

export const Box = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
flex-direction: column;
gap: 24px;

margin: 0 auto;
margin-top: 175px;

@media (min-width: 768px) {
  margin-top: 175px;
justify-content: center;

  }

@media (min-width: 1280px) {
  margin-top: 150px;
  }
`;

export const ReadBtn = styled.button`
  width: 310px;
  height: 46px;
  background-color: var(--red);
  border-radius: 8px;

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
    width: 219px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (min-width: 1280px) {
    font-size: 16px;
  }
  `;

export const Text = styled.p`
width: 219px;
font-weight: 700;
text-align: center;

margin-top: 100px;

@media (min-width: 768px) {
  margin-top: 0;
  }
`;