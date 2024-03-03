"use client";
import styled from "@emotion/styled";
import Link from "next/link";

export const SearchItemContainer = styled.li`
  background-color: #fff;
  font-size: 18px;
  font-weight: 600;
  :hover {
    background-color: var(--gray_search);
  }
`;

export const SearchLink = styled(Link)`
  display: block;
  padding: 16px 24px;
`;
