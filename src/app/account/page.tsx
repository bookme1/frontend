'use client';

import { useEffect, useState } from 'react';

import { Loading } from '@/components/SERVICE_PAGES/Loading';
import { LeftMenu } from '@/components/account/LeftMenu';
import { UserBooks } from '@/components/account/UserBooks';
import { BreadCrumbs } from '@/components/common/BreadCrumbs';
import { Header } from '@/components/common/Header';
import useUserLoginData from '@/components/common/Header/loginFunc';
import { Wrapper } from '@/styles/globals.styles';

export default function Home() {
  const [isFavVisible, setIsFavVisible] = useState(false);

  const handleFavClick = () => {
    setIsFavVisible(!isFavVisible);
  };

  // const getBooks = useGetBooksQuery('');
  // useEffect(() => {
  //   getBooks;
  // });

  // const books = getBooks.data;

  const { userData, error, isLoading } = useUserLoginData();
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Wrapper>
        <Header userData={userData?.user} />
        {/* <button
        onClick={() => {
          bookService.updateBooksFromServer();
        }}
      >
        UPDATE
      </button> */}
        <BreadCrumbs name="акаунт" />
        <LeftMenu name={userData?.user.username} />
        <UserBooks userData={userData?.user} />
      </Wrapper>
    </>
  );
}
