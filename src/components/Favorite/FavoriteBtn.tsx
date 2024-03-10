import { AddToFavorite, RemoveFavorite } from "@/lib/redux";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { HeartFillStyles } from "../common/Card/Card.styles";
import { HeartNotFillStyles } from "../book/MainInformation/MainInformation.styles";

const FavoriteBtn = ({ book }: { book: any }) => {
  const dispatch = useDispatch();

  const [isFavorite, setIsFavotire] = useState(false);

  const handleFavoriteClick = () => {
    dispatch(AddToFavorite(book));
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
