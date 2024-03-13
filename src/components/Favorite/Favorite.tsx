"use client";
import React from "react";
import { useSelector } from "react-redux";
import { Card } from "../common/Card";
import { selectFavorite } from "@/lib/redux";


const Favorite = () => {
  const favorite = useSelector(selectFavorite)
  return (
    <>
      <p>test</p>
      <ul>
        {favorite.map((book: any) => (
          <Card key={book.id} book={book} />
        ))}
      </ul>
    </>
  );
};

export default Favorite;



