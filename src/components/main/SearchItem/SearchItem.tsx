"use client";
import styled from "@emotion/styled";

const SearchItemContainer = styled.li`
  padding: 16px 24px;
  background-color: #fff;
  font-size: 18px;
  font-weight: 600;
  :hover {
    background-color: var(--gray_search);
  }
`;

const SearchLink = styled.a``;

const SearchItem = ({ title }: { title: any }) => {
  return (
    <SearchItemContainer>
      <SearchLink href="#">{title}</SearchLink>
    </SearchItemContainer>
  );
};

export default SearchItem;
