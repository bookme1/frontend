"use client";
import { AddToFavorite, RemoveFromFavorite, useDispatch } from "@/lib/redux";
import React, { useEffect, useState } from "react";

import { HeartFillStyles } from "../common/Card/Card.styles";
import { HeartNotFillStyles } from "../book/MainInformation/MainInformation.styles";
import {
  useAddBookQuery,
  useRemoveBookQuery,
} from "@/lib/redux/features/user/userApi";
import { BookType } from "@/lib/redux/features/user/types";

const FavoriteBtn = ({
  book,
  isFavAlredy,
}: {
  book: any;
  isFavAlredy: boolean;
}) => {
  const [isFavorite, setIsFavotire] = useState(isFavAlredy);
  const token = localStorage.getItem("accessToken");

  const addFavBooks = useAddBookQuery({
    accessToken: token ?? "",
    bookId: book.id ?? "",
    type: BookType.Fav,
  });

  const removeFavBooks = useRemoveBookQuery({
    accessToken: token ?? "",
    bookId: book.id ?? "",
    type: BookType.Fav,
  });

  useEffect(() => {
    addFavBooks;
    removeFavBooks;
  }, [addFavBooks, removeFavBooks]);

  function addIdToLocalStorage(id: string): void {
    let favorites: string[] = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    favorites.push(id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  function removeIdFromLocalStorage(id: string): void {
    let favorites: string[] = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    const index: number = favorites.indexOf(id);
    if (index !== -1) {
      favorites.splice(index, 1);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }

  const handleFavoriteClick = () => {
    if (token !== null) {
      addFavBooks;
    } else {
      addIdToLocalStorage(book.id);
    }

    setIsFavotire(!isFavorite);
  };

  const handleNotFavoriteClick = () => {
    if (token !== null) {
      // removeFavBooks;
    } else {
      removeIdFromLocalStorage(book.id);
    }

    setIsFavotire(!isFavorite);
  };

  return (
    <>
      {isFavorite ? (
        <HeartFillStyles onClick={handleNotFavoriteClick} />
      ) : (
        <HeartNotFillStyles onClick={handleFavoriteClick} />
      )}
    </>
  );
};

export default FavoriteBtn;
