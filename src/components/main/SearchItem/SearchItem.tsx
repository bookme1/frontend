"use client";
import { SearchItemContainer, SearchLink } from "./SearchItem.styles";

const SearchItem = ({ title, id }: { title: string; id: string }) => {
  const linkHref = `/book/${id}`;
  return (
    <SearchItemContainer>
      <SearchLink href={linkHref}>{title}</SearchLink>
    </SearchItemContainer>
  );
};

export default SearchItem;
