"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Card } from "../common/Card";
import {
  GetFromFavorite,
  selectBooks,
  selectFavorite,
  useDispatch,
} from "@/lib/redux";
import { FavList, Text } from "./Favorite.styles";
import { useGetUserBooksQuery } from "@/lib/redux/features/user/userApi";
import { BookType } from "@/lib/redux/features/user/types";

const Favorite = ({ books }) => {
  const token = localStorage.getItem("accessToken");

  const fav = useGetUserBooksQuery({
    accessToken: token ?? "",
    type: BookType.Fav,
  });

  useEffect(() => {
    fav;
  });

  const favorite = fav.data;
  
  let favIdList: any;
  if (typeof window !== "undefined") {
    favIdList = localStorage.getItem("favorites");
  }

  const favIdListArr = JSON.parse(favIdList);

  let favBooks = [];
  if (token === null) {
    favBooks = books?.filter((book: any) => favIdList?.includes(book.id));
  } else {
    // favBooks = books.filter((book: any) => favorite?.includes(book.id));
  }

  return (
    <>
      {favBooks?.length === 0 ? (
        <Text>There are no favorite books here</Text>
      ) : (
        <FavList>
          {favBooks?.map((book: any) => (
            <Card
              key={book.id}
              book={book}
              favorite={token === null ? favIdListArr : favorite}
            />
          ))}
        </FavList>
      )}
    </>
  );
};

export default Favorite;
