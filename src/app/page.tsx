'use client';

import { useEffect } from 'react';

import { Loading } from '@/components/SERVICE_PAGES/Loading';
import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';
import { Categories } from '@/components/main/Categories';
import { Hero } from '@/components/main/Hero';
import SuccessInfo from '@/components/main/Modal/SuccessInfo/SuccessInfo';
import { SwiperList } from '@/components/main/SwiperList';
import { useUser } from '@/contexts/UserContext';
import { useSelector } from '@/lib/redux';
import {
  useGetFiltersQuery,
  useGetGenresQuery,
} from '@/lib/redux/features/book/bookApi';
import { BookType } from '@/lib/redux/features/user/types';
import { useGetUserBooksQuery } from '@/lib/redux/features/user/userApi';

export default function Home() {
  const data = useUser();

  if (!data) return <Loading />;

  const { userData, isLoading, error } = data;

  if (data.isLoading) return <Loading />;

  return (
    <>
      <Header userData={userData} />
      <Hero />
      <Categories />
      <SwiperList />

      <Footer />
    </>
  );
}
