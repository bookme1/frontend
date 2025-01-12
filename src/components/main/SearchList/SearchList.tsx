'use client';

import { SearchListContainer, SearchListList } from './SearchList.styles';
import { IBook } from '@/app/book/[id]/page.types';

import { SearchItem } from '../SearchItem';

const SearchList = ({ books }: { books: IBook[] | undefined }) => {
  if (!books) {
    return <p>Error while fetching books</p>;
  }

  const searchMarkup = books.map(book => (
    <SearchItem key={book.title} title={book.title} id={book.id} />
  ));
  return (
    <SearchListContainer>
      <SearchListList>{searchMarkup}</SearchListList>
    </SearchListContainer>
  );
};

export default SearchList;
