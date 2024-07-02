"use client";
import { useEffect } from "react";
import { CardList } from "../CardList";
import { useGetBooksQuery } from "@/lib/redux/features/book/bookApi";

const SwiperList = () => {
  const { data: books, error, isLoading } = useGetBooksQuery("");

  const name = "Популярне";

  useEffect(() => {
    if (!books) {
      console.log("no books");
    }
  }, [books]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: error</p>;
  }

  if (!books || books.length === 0) {
    return <p>No books found</p>;
  }

  return <CardList name={name} books={books.slice(0, 15)} />;
};

export default SwiperList;
