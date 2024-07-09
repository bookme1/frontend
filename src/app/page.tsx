'use client';

import { useEffect, useState } from 'react';

import { Loading } from '@/components/SERVICE_PAGES/Loading';
import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';
import { Categories } from '@/components/main/Categories';
import { Hero } from '@/components/main/Hero';
import SuccessInfo from '@/components/main/Modal/SuccessInfo/SuccessInfo';
import { SwiperList } from '@/components/main/SwiperList';
import { useSelector } from '@/lib/redux';
import {
  useGetFiltersQuery,
  useGetGenresQuery,
} from '@/lib/redux/features/book/bookApi';
import { BookType, loginOutputDTO } from '@/lib/redux/features/user/types';
import { useGetUserBooksQuery } from '@/lib/redux/features/user/userApi';

export default function Home() {
  let token;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('accessToken');
  }

  if (!token) token = '1';
  const getBooks = useGetUserBooksQuery({
    accessToken: token,
    type: BookType.Fav,
  });

  useEffect(() => {
    getBooks;
  }, []);

  // Пример стягивания жанров для Димы. В обьекте genres так же есть много полезных проперти, например состояние загрузки для лоадера. После применения удалить с этого файла
  const genres = useGetGenresQuery('');

  // useEffect(() => {
  //   console.log("Genres");
  //   console.log(genres.data);
  // }, [genres]);

  // Стягивание всех фильтров для отображения в маркапе на странице с фильтрами

  const filters = useGetFiltersQuery('');

  // useEffect(() => {
  //   console.log("Filters");
  //   console.log(filters.data);
  // }, [filters]);
  const modals = useSelector((state: any) => state.modals.modals);

  return (
    <>
      <Header />
      <Hero />
      <Categories />
      <SwiperList />

      <Footer />

      {modals.successInfo.isOpen && <SuccessInfo />}
    </>
  );
}
