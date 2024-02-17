"use client";

import { CardList } from "../CardList";

import { useSelector } from "react-redux";
import { selectBooks } from "@/lib/redux";

const SwiperList = () => {
  const booksArr = useSelector(selectBooks);

  const name = "Популярне";

  return <CardList name={name} books={booksArr} />;
};

export default SwiperList;
