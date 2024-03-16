"use client";
import { AddToFavorite, RemoveFavorite, selectFavorite } from "@/lib/redux";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HeartFillStyles } from "../common/Card/Card.styles";
import { HeartNotFillStyles } from "../book/MainInformation/MainInformation.styles";

const FavoriteBtn = ({ book }: { book: any }) => {
  const dispatch = useDispatch();
  const favoriteList = useSelector(selectFavorite);

  const [isFavorite, setIsFavotire] = useState(false);


  const reqestData = { bookId: book.id };
  const handleFavoriteClick = () => {
    dispatch(AddToFavorite(reqestData));

    setIsFavotire(!isFavorite);
  };
  const handleNotFavoriteClick = () => {
    dispatch(RemoveFavorite(book));
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
