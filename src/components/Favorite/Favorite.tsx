"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../common/Card";
import {
  GetFromFavorite,
  fetchAllBooks,
  selectBooks,
  selectFavorite,
} from "@/lib/redux";
import { FavList, Text } from "./Favorite.styles";

const Favorite = () => {
  const favorite = useSelector(selectFavorite);
  const books = useSelector(selectBooks);
  const dispatch = useDispatch();

  const favIdList = localStorage.getItem("favorites");
  const favIdListArr = JSON.parse(favIdList);
  const token = localStorage.getItem("accessToken");

  let favBooks = [];
  if (token === null) {
    favBooks = books.filter((book: any) => favIdList?.includes(book.id));
  } else {
    favBooks = books.filter((book: any) => favorite[0]?.includes(book.id));
  }
console.log(favBooks)
console.log(favorite)

  useEffect(() => {
    dispatch(GetFromFavorite());
    dispatch(fetchAllBooks());
  }, [dispatch]);

  return (
    <>
      {favBooks.length === 0 ? (
        <Text>There are no favorite books here</Text>
      ) : (
        <FavList>
          {favBooks.map((book: any) => (
            <Card
              key={book.id}
              book={book}
              favorite={token === null ? favIdListArr : favorite[0]}
            />
          ))}
        </FavList>
      )}
    </>
  );
};

export default Favorite;
