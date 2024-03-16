"use client";
import { AddToFavorite,  RemoveFromFavorite, selectFavorite } from "@/lib/redux";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HeartFillStyles } from "../common/Card/Card.styles";
import { HeartNotFillStyles } from "../book/MainInformation/MainInformation.styles";

const FavoriteBtn = ({ book,isFavAlredy }: { book: any, isFavAlredy:boolean }) => {
  const dispatch = useDispatch();
  const favoriteList = useSelector(selectFavorite);

  const [isFavorite, setIsFavotire] = useState(isFavAlredy);


  const reqestData = { bookId: book?.id };
  const handleFavoriteClick = () => {
    dispatch(AddToFavorite(reqestData));

    setIsFavotire(!isFavorite);
  };
  const handleNotFavoriteClick = () => {
    dispatch(RemoveFromFavorite(book.id));
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
