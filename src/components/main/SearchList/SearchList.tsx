"use client";
import { SearchItem } from "../SearchItem";
import { IBook } from "./SearchList.types";
import { SearchListContainer, SearchListList } from "./SearchList.styles";

const SearchList = ({ books }: { books: IBook[] }) => {
  const searchMarkup = books.map((book) => (
    <SearchItem key={book.title} title={book.title} id={book.id} />
  ));
  return (
    <SearchListContainer>
      <SearchListList>{searchMarkup}</SearchListList>
    </SearchListContainer>
  );
};

export default SearchList;
