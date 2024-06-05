"use client";
import styled from "@emotion/styled";

export const SearchListContainer = styled.div`
  position: absolute;
  top: 49px;
  left: 0;
  margin: 0 auto;
  width: 430px;
  border: 1px solid var(--gray_border);
  z-index: 10;
`;

export const SearchListList = styled.ul`
max-height: 200px;
overflow-y: auto;
`;
