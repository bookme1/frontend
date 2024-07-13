'use client';

import { signOut } from 'next-auth/react';
import { useState } from 'react';

import { bookService } from '@/api/book/bookService';
import { Favorite } from '@/components/Favorite';
import { LeftMenu } from '@/components/account/LeftMenu';
import { BreadCrumbs } from '@/components/common/BreadCrumbs';
import { Header } from '@/components/common/Header';
import { Icon } from '@/components/common/Icon';

export default function Home() {
  const [isFavVisible, setIsFavVisible] = useState(false);

  const handleFavClick = () => {
    setIsFavVisible(!isFavVisible);
  };

  return (
    <>
      <Header />
      <button
        onClick={() => {
          bookService.updateBooksFromServer();
        }}
      >
        UPDATE
      </button>
      <BreadCrumbs name="акаунт" />
      <LeftMenu />
    </>
  );
}
