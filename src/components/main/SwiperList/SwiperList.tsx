"use client";
import { useEffect } from "react";
import { CardList } from "../CardList";
import { useGetBooksQuery } from "@/lib/redux/features/book/bookApi";

const SwiperList = () => {
  const getBooks = useGetBooksQuery("");
  useEffect(() => {
    getBooks;
  });

  const booksArr = getBooks.data;
 
  const name = "Популярне";
  if (!booksArr)
    return <p>Книжок не знайдено :(</p>;
  
  return <CardList name={name} books={booksArr?.slice(0, 15) ?? []} />;
};

export default SwiperList;
