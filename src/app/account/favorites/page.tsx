'use client';

import { useEffect, useState } from 'react';

import { Favorite } from '@/components/Favorite';
import { LeftMenu } from '@/components/account/LeftMenu';
import { BreadCrumbs } from '@/components/common/BreadCrumbs';
import { Header } from '@/components/common/Header';
import { Icon } from '@/components/common/Icon';
import { useGetBooksQuery } from '@/lib/redux/features/book/bookApi';
import { Wrapper } from '@/styles/globals.styles';

export default function Home() {
  const [isFavVisible, setIsFavVisible] = useState(false);

  const handleFavClick = () => {
    setIsFavVisible(!isFavVisible);
  };

  const getBooks = useGetBooksQuery('');
  useEffect(() => {
    getBooks;
  });

  const books = getBooks.data;

  return (
    <Wrapper>
      <Header />
      {/* <button
        onClick={() => {
          bookService.updateBooksFromServer();
        }}
      >
        UPDATE
      </button> */}
      <BreadCrumbs name="акаунт" />
      <LeftMenu />
      <Favorite books={books} />
    </Wrapper>
  );
}
