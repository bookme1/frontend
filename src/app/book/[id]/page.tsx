'use client';

import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { usePathname, useRouter } from 'next/navigation';

import { IBook } from './page.types';
import { bookService } from '@/api/book/bookService';
import { MainInformation } from '@/components/book/MainInformation';
import { Reviews } from '@/components/book/Reviews';
import { SliderLastBooks } from '@/components/book/SliderLastBooks';
import { BreadCrumbs } from '@/components/common/BreadCrumbs';
import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';
import { selectBooks } from '@/lib/redux';

export default function Home() {
  const dispatch = useDispatch();
  const booksArr = useSelector(selectBooks);

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
    const res = booksArr.filter((book: any) => book.id === id);
    if (res) {
      setBook(res[0]);
    }
  }, [booksArr, id]);
  console.log(book);
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
