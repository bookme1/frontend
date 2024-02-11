"use client";
// import { bookService } from "@/api/book/bookService";
import { CardList } from "../CardList";
import { useEffect, useState } from "react";
// import { getBooks } from "@/lib/redux/slices/counterSlice/fetchIdentityCount";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBooks, selectBooks } from "@/lib/redux";

const SwiperList = () => {
  const booksArr = useSelector(selectBooks);
  const dispatch = useDispatch();

  const name = "Популярне";

  useEffect(() => {
    dispatch(fetchAllBooks());
 
  }, [dispatch]);

  return <CardList name={name} books={booksArr} />;
};

export default SwiperList;
