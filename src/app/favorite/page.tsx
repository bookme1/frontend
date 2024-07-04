'use client';

import React, { useEffect } from 'react';

import { Favorite } from '@/components/Favorite';
import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';
import { useGetBooksQuery } from '@/lib/redux/features/book/bookApi';

export default function Home() {
  const getBooks = useGetBooksQuery('');
  useEffect(() => {
    getBooks;
  });

  const books = getBooks.data;

  return (
    <>
      <Header />
      <Favorite books={books} />
      <Footer />
    </>
  );
}
