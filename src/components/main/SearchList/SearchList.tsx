"use client";
import styled from "@emotion/styled";

const SearchListContainer = styled.div`
  position: absolute;
  top: 49px;
  left: 0;
  margin: 0 auto;
  width: 643px;
  border: 1px solid var(--gray_border);
`;

const SearchListList = styled.ul``;

const SearchItem = styled.li`
  padding: 16px 24px;
  background-color: #fff;
  :hover {
    background-color: var(--gray_search);
  }
`;
const SearchLink = styled.a``;

interface IBook {
  id: string;
  title: string;
  url: string;
  price: number;
  author: string;
}

const SearchList = ({ books }: { books: IBook[] }) => {
  const searchMarkup = books.map((book) => (
    <SearchItem key={book.title}>
      <SearchLink>{book.title}</SearchLink>
    </SearchItem>
  ));
  return (
    <SearchListContainer>
      <SearchListList>{searchMarkup}</SearchListList>
    </SearchListContainer>
  );
};

export default SearchList;
