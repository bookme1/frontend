"use client";

import styled from "@emotion/styled";

export const AsideContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;

  display: flex;
  @media (min-width: 1280px) {
position: relative;

/* display: none; */
}
`;


export const AsideContant = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  max-width: 375px;
  margin-left: 0;
  margin-right: auto;
  background-color: #fff;

  padding-left: 16px;

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
    /* width: 0px; */
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--gray_border);
    border-radius: 6px;
  }

  @media (min-width: 768px) {

  }
  @media (min-width: 1280px) {
 
  }
`

export const PartBox = styled.div`
margin-bottom: 22px;

`

export const PartBoxTitle = styled.div`
margin-bottom: 22px;
display: flex;
align-items: center;
`

export const BackBtn = styled.button`
border-radius: 50%;
width: 40px;
height: 40px;
box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);

display: flex;
justify-content: center;
align-items: center;
margin-right: 16px;

@media (min-width: 1280px) {
display: none;
}
`

export const Title = styled.h2`
color: var(--text_main);
font-weight: 700;
font-size: 24px;
line-height: 33.6px;

@media (min-width: 1280px) {
display: none;
}
`

export const SubTitle = styled.h3`
color: var(--text_main);
font-weight: 700;
font-size: 20px;
line-height: 28px;
margin-bottom: 24px;
`

export const Label = styled.label`
color: var(--gray_dark);
font-weight: 500;
font-size: 18px;
line-height: 21.13px;
`

export const CheckBox = styled.div`
display: flex;
gap: 16px;


`

export const PriceBox = styled.div`
display: flex;
flex-wrap: wrap;
width: 100%;
gap: 16px;

max-width: 319px;
`

export const RangeInput = styled.input`
border: 1px solid var(--gray_border);
border-radius: 16px;
padding: 14px 24px;
width: 150px;

font-weight: 500;
font-size: 20px;
line-height: 23.48px;
color: var(--gray);

&:focus {
color: var(--text_main);
}
`

export const OkBtn = styled.button`
border-radius: 16px;
background-color: var(--red);
padding: 10px;
width: 316px;

color: #FFF;
font-weight: 500;
font-size: 20px;
line-height: 23.48px;
`

export const SearchInput = styled.input`
border: 1px solid var(--gray_border);
border-radius: 16px;
padding: 14px 24px;
width: 316px;
padding: 14px 24px;

font-weight: 600;
font-size: 18px;
line-height: 21.13px;
color: var(--gray);
margin-bottom: 24px;

&:focus {
color: var(--text_main);
}
`

export const InputStyled = styled.input`
margin-right: 16px;
`

export const ApplyBtn = styled.button`
position: sticky;
top: 15%;
border-radius: 16px;
background-color: var(--red);
padding: 10px;
width: 316px;

color: #FFF;
font-weight: 500;
font-size: 20px;
line-height: 23.48px;
cursor: pointer;
`