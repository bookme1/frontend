'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';
import Notiflix from 'notiflix';
import { v4 as uuidv4 } from 'uuid';

import {
  Author,
  AuthorsList,
  Controls,
  ImageContainer,
  InfoContainer,
  MainInfoContainer,
  Price,
  StyledWrapper,
  Title,
  ToCart,
  ToFavorite,
} from './MainInformation.styles';
import { bookService } from '@/api/book/bookService';
import { IBook } from '@/app/book/[id]/page.types';
import FavoriteBtn from '@/components/Favorite/FavoriteBtn';
import useUserLoginData from '@/components/common/Header/loginFunc';
import { Icon } from '@/components/common/Icon';
import useAuthStatus from '@/components/hooks/useAuthStatus';
import usePayStatus from '@/components/hooks/usePayStatus';
import { useWindowSize } from '@/hooks/useWindowSize';
import { BookType } from '@/lib/redux/features/user/types';
import { useGetUserBooksQuery } from '@/lib/redux/features/user/userApi';
import { Wrapper } from '@/styles/globals.styles';

import { Characteristics } from '../Characteristics';
import { ICharacteristics } from '../Characteristics/Characteristics.types';
import { Formats } from '../Formats';

const MainInformation = ({
  book,
  characteristics,
}: {
  book: IBook;
  characteristics: ICharacteristics;
}) => {
  console.log('book');
  console.log(book);
  const router = usePathname();
  const [checkedFormats, setCheckedFormats] = useState<string[]>([]);

  const id = router?.split('/').pop();

  let token;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('accessToken');
  }

  const fav = useGetUserBooksQuery({
    accessToken: token ?? '',
    type: BookType.Fav,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      fav;
    }
  }, [fav]);

  const favorite = fav.data;

  const screenWidth = useWindowSize().width;
  const getAuthorsMarkup = (authors: string) => {
    if (authors === undefined) return;
    const authorsArr = authors.split(',');
    return authorsArr.map(author => {
      return <Author key={author}>{author}</Author>;
    });
  };
  const authorsMarkup = getAuthorsMarkup(book.author);

  let isFavAlredy = [];
  if (Array.isArray(favorite)) {
    isFavAlredy = favorite?.some((fav: any) => fav === id);
  }

  //Test if user logged in. If logged in -> checkout can be
  const { userLoggedData, isLoading } = useAuthStatus(); // Используем новый хук

  async function handleCheckout() {
    if (checkedFormats.length == 0) {
      Notiflix.Notify.failure('Оберіть формати книг, які ви хочете придбати!');
      return;
    }
    if (!userLoggedData) {
      Notiflix.Notify.failure(
        'Щоб отримати необмежений доступ до книги (і користуватись нашим рідером) будь ласка, увійдіть в акаунт!'
      );
      return;
    }
    const order_id = uuidv4();
    const accessToken = localStorage.getItem('accessToken');
    bookService.makeTestCheckout(book.price, order_id);

    const transaction_id = await bookService.makeWatermarking(
      checkedFormats.join(','),
      book.referenceNumber,
      order_id
    );
    if (transaction_id) {
      console.log('transaction successful');
    }
    const res = await bookService.makeOrder(
      accessToken,
      order_id,
      checkedFormats.join(','),
      transaction_id,
      book.referenceNumber
    );
  }

  const aviableFormats = [false, false, false];

  if (book.formatMobi) aviableFormats[1] = true;
  if (book.formatPdf) aviableFormats[0] = true;
  if (book.formatEpub) aviableFormats[2] = true;

  return (
    <>
      <StyledWrapper>
        <ImageContainer
          style={{ ['--background-image' as string]: `url(${book?.url})` }}
        ></ImageContainer>
        <InfoContainer>
          <MainInfoContainer>
            <Title>{book?.title}</Title>
            <AuthorsList>{authorsMarkup}</AuthorsList>
            <Price>{book?.price} ₴</Price>
            <Controls>
              <ToCart>
                <Icon name="cart" size={28} />В кошик
              </ToCart>
              <ToCart
                onClick={() => {
                  handleCheckout();
                }}
              >
                Купити зараз
              </ToCart>
              <ToFavorite>
                <FavoriteBtn book={book} isFavAlredy={isFavAlredy} />
              </ToFavorite>
            </Controls>
            <Formats
              setChecked={setCheckedFormats}
              pdf={aviableFormats[0]}
              mobi={aviableFormats[1]}
              epub={aviableFormats[2]}
            />
          </MainInfoContainer>
          {screenWidth && (screenWidth < 768 || screenWidth >= 1280) && (
            <Characteristics characteristics={characteristics} />
          )}
        </InfoContainer>
      </StyledWrapper>
      {screenWidth && screenWidth >= 768 && screenWidth < 1280 && (
        <Wrapper>
          <Characteristics characteristics={characteristics} />
        </Wrapper>
      )}
    </>
  );
};

export default MainInformation;
