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
import { FavList } from "./Favorite.styles";



const Favorite = () => {
  const favorite = useSelector(selectFavorite);
  const books = useSelector(selectBooks);
  const dispatch = useDispatch();

  const favBooks = books.filter((book: any) => favorite[0]?.includes(book.id));

  useEffect(() => {
    dispatch(GetFromFavorite());
    dispatch(fetchAllBooks());
  }, [dispatch]);

  
  return (
    <>
      {favorite[0]?.length === 0 ? (
        <p>There are no favorite books here</p>
      ) : (
        <FavList>
          {favBooks.map((book: any) => (
            <Card key={book.id} book={book} favorite={favorite[0]}/>
          ))}
        </FavList>
      )}
    </>
  );
};

export default Favorite;
