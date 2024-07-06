'use client';

import React, { useEffect } from 'react';

import { FavList, Text } from './Favorite.styles';

import { BookType, IUser } from '@/lib/redux/features/user/types';
import { useGetUserBooksQuery } from '@/lib/redux/features/user/userApi';

import { Card } from '../common/Card';

const Favorite = ({ books }: { books: any }) => {

  // let token:any;
  // if (typeof window !== 'undefined') {
  //   const token = localStorage.getItem('accessToken');
  // }

  const token = localStorage.getItem('accessToken');



  const fav = useGetUserBooksQuery({
    accessToken: token ?? '',
    type: BookType.Fav,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
    fav;}
  },[fav]);

  const favorite = fav.data;

  let favoriteArr: IUser[] = [];
  
  favorite?.map(data=>favoriteArr.push(data));
  // if (typeof favorite === 'object') {

  // } else {
  //   favoriteArr = [];
  // }


  

console.log(favorite)
console.log(favoriteArr)



 
  let favIdList: any;
  if (typeof window !== 'undefined') {
    favIdList = localStorage.getItem('favorites');
  }

  

 
  // let favIdListArr: IUser[] = [];
  
  // if (typeof favorite === 'string') {
  //   favIdListArr = Object.values(favIdList);
  // } else {
  //   favIdListArr = [];
  // }

  const favIdListArr = JSON.parse(favIdList);




  let favBooks:any = [];
  if (token === null) {
    favBooks = books?.filter((book: any) => favIdList?.includes(book.id));
  } else {
    if (!Array.isArray(favBooks)) {
      console.warn("Array of favorite books is not an array")
    }
    favBooks = books?.filter((book: any) => favoriteArr?.includes(book.id));
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
              favorite={token === null ? favIdListArr : favoriteArr}
            />
          ))}
        </FavList>
      )}
    </>
  );
};

export default Favorite;
