"use client";
import { AddToFavorite, RemoveFromFavorite, useDispatch } from "@/lib/redux";
import React, { useEffect, useState } from "react";

import { HeartFillStyles } from "../common/Card/Card.styles";
import { HeartNotFillStyles } from "../book/MainInformation/MainInformation.styles";

const FavoriteBtn = ({
  book,
  isFavAlredy,
}: {
  book: any;
  isFavAlredy: boolean;
}) => {
  const dispatch = useDispatch();

  const [isFavorite, setIsFavotire] = useState(isFavAlredy);
  const token = localStorage.getItem("accessToken");


  interface AddToFavoriteRequest {
    bookId: string; // Assuming the bookId is of type string
  }

  const reqestData: AddToFavoriteRequest = { bookId: book?.id };

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
      dispatch(AddToFavorite(reqestData));
    } else {
      addIdToLocalStorage(book.id);
    }

    setIsFavotire(!isFavorite);
   
    
  };

  const handleNotFavoriteClick = () => {
    if (token !== null) {
      dispatch(RemoveFromFavorite(book.id));
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
