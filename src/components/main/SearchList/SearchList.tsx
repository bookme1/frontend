"use client";
import styled from "@emotion/styled";
import { SearchItem } from "../SearchItem";

const SearchListContainer = styled.div`
  position: absolute;
  top: 49px;
  left: 0;
  margin: 0 auto;
  width: 430px;
  border: 1px solid var(--gray_border);
  z-index: 10;
`;

const SearchListList = styled.ul``;

interface IBook {
  id: string;
  title: string;
  url: string;
  price: number;
  author: string;
}

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
