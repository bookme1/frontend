'use client';

import { useEffect, useState } from 'react';


import { usePathname } from 'next/navigation';

import { IBook } from './page.types';

import { MainInformation } from '@/components/book/MainInformation';
import { Reviews } from '@/components/book/Reviews';
import { SliderLastBooks } from '@/components/book/SliderLastBooks';
import { BreadCrumbs } from '@/components/common/BreadCrumbs';
import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';

import { useGetBooksQuery } from '@/lib/redux/features/book/bookApi';
import { Loading } from '@/components/SERVICE_PAGES/Loading';

export default function Home() {

  const getBooks = useGetBooksQuery("");
  useEffect(() => {
    getBooks;
  });

  const booksArr = getBooks.data;

  if (!Array.isArray(booksArr)) {
    console.warn("Array of books is not an array")
  //  return <Loading />
  }

  const mockBook = {
    id: '0',
    title: '0',
    author: '0',
    url: '0',
    price: 0,
    lang: '0',
    pub: '0',
    pages: 0,
    desc: '0',
  };

  const [book, setBook] = useState<IBook>(mockBook);
  const router = usePathname();
  const id = router?.split('/').pop();
  useEffect(() => {
    if (id === undefined) {
      return;
    }
    const res = booksArr?.filter((book: any) => book.id === id);
    if (res) {
      setBook(res[0]);
    }
  }, [booksArr, id]);
  return (
    <>
      <Header />
      {book && <BreadCrumbs name={book.title} />}
      {book && (
        <MainInformation
          book={book}
          characteristics={{
            language: book.lang,
            publish: book.pub,
            pages: book.pages,
            description: book.desc,
          }}
          // pathname={pathname}
        />
      )}

      <Reviews />
      <SliderLastBooks />
      <Footer />
    </>
  );
}
