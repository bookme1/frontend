"use client";
import { bookService } from "@/api/book/bookService";
import { CardList } from "../CardList";
import { useEffect, useState } from "react";

const SwiperList = () => {
  const [books, setBooks] = useState<any[]>([]);
  const name = "Популярне";
  const fetchBooks = async () => {
    const data = await bookService.getAllBooks();
    setBooks(data);
  };
  useEffect(() => {
    fetchBooks();
  }, []);
  return <CardList name={name} books={books} />;
};

export default SwiperList;
