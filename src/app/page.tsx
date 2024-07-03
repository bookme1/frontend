"use client";
import { Categories } from "@/components/main/Categories";
import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header";
import { Hero } from "@/components/main/Hero";
import { SwiperList } from "@/components/main/SwiperList";
import { Loading } from "@/components/SERVICE_PAGES/Loading";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  useGetDataMutation,
  useGetUserBooksQuery,
  useGoogleAuthMutation,
  useRefreshTokenMutation,
} from "@/lib/redux/features/user/userApi";
import { BookType, loginOutputDTO } from "@/lib/redux/features/user/types";
import useUserLoginData from "@/components/common/Header/loginFunc";
import { useGetFiltersQuery, useGetGenresQuery } from "@/lib/redux/features/book/bookApi";

export default function Home() {

  let token = localStorage.getItem("accessToken");
  if (!token) token = "1";
  const getBooks = useGetUserBooksQuery({
    accessToken: token,
    type: BookType.Fav,
  });

  useEffect(() => {
    getBooks;
  }, []);

  // Пример стягивания жанров для Димы. В обьекте genres так же есть много полезных проперти, например состояние загрузки для лоадера. После применения удалить с этого файла
  const genres = useGetGenresQuery("");

  useEffect(() => {
    console.log("Genres");
    console.log(genres.data);
  }, [genres]);

  // Стягивание всех фильтров для отображения в маркапе на странице с фильтрами

    const filters = useGetFiltersQuery("");

  useEffect(() => {
    console.log("Filters");
    console.log(filters.data);
  }, [filters]);

  return (
    <>
      <Header />
      <Hero />
      <Categories />
      <SwiperList />
      <Footer />
    </>
  );
}
