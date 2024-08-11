"use client";
import { useEffect } from "react";
import { CardList } from "../CardList";
import { useGetFilterBooksQuery } from "@/lib/redux/features/book/bookApi";

const SwiperList = ({ name, parametrData, value }: { name: string, parametrData?: string, value?: string }) => {
  const { data } = useGetFilterBooksQuery({ [value ? value : ""]: parametrData });

  const booksArr = data?.books;

  if (!booksArr)
    return <p>Книжок не знайдено :(</p>;

  console.log(booksArr)
  
  return <CardList name={name} books={booksArr} />;
};

export default SwiperList;
