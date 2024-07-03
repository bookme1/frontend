"use client";
import { CardList } from "../CardList";
import { useGetBooksQuery } from "@/lib/redux/features/book/bookApi";
import { useEffect } from "react";

const SwiperList = () => {
  const getBooks = useGetBooksQuery("");
  useEffect(() => {
    getBooks;
  });

  const booksArr = getBooks.data;
 
  const name = "Популярне";

  return <CardList name={name} books={booksArr?.slice(0, 15) ?? []} />;
};

export default SwiperList;
