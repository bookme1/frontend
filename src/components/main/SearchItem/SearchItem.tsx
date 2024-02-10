"use client";
import styled from "@emotion/styled";
import Link from "next/link";

const SearchItemContainer = styled.li`
  background-color: #fff;
  font-size: 18px;
  font-weight: 600;
  :hover {
    background-color: var(--gray_search);
  }
`;

const SearchLink = styled(Link)`
  display: block;
  padding: 16px 24px;
`;

const SearchItem = ({ title, id }: { title: string; id: string }) => {
  const linkHref = `/book/${id}`;
  return (
    <SearchItemContainer>
      <SearchLink href={linkHref}>{title}</SearchLink>
    </SearchItemContainer>
  );
};

export default SearchItem;
