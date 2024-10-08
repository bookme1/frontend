'use client';

import { useEffect, useState } from 'react';

import Notiflix from 'notiflix';
import { Notify } from 'notiflix';

import {
    Authors,
    BookFormatContainer,
    BottomContainer,
    BoxStyles,
    CardContainer,
    CardLink,
    CartButton,
    DescriptionContainer,
    ImageContainer,
    Price,
    Title,
} from './Card.styles';
import { lazyloadExp } from './lazyload';
import { IBook } from '@/app/book/[id]/page.types';
import { BookFormat } from '@/components/BookFormat';
import FavoriteBtn from '@/components/Favorite/FavoriteBtn';
import { openModal, useDispatch, useSelector } from '@/lib/redux';
import {
    useAddFavoriteMutation,
    useGetFavoritesQuery,
} from '@/lib/redux/features/book/bookApi';
import { BookType } from '@/lib/redux/features/user/types';

import { Icon } from '../Icon';

const Card = ({ book }: { book: IBook | undefined }) => {
    let initialBook;
    if (!book)
        initialBook = { title: '1', url: '1', price: 0, author: '1', id: '1' };
    else initialBook = book;

    const { title, url, price, author, id } = initialBook;
    lazyloadExp();

    const [addBook, { isLoading }] = useAddFavoriteMutation();
    const token =
        typeof window !== 'undefined'
            ? localStorage.getItem('accessToken')
            : null;

    const handleAddBook = () => {
        if (!token || !id) {
            Notiflix.Notify('Користувач не авторизований');
            return;
        }

        addBook({
            accessToken: token,
            bookId: id,
            type: BookType.Cart,
        });
    };

    const dispatch = useDispatch();
    const handleOpenModal = (modalName: string) => {
        dispatch(openModal(modalName));
    };

    return (
        <li style={{ height: 455 }}>
            <CardContainer>
                <ImageContainer
                    className="lazyload"
                    style={{ ['--background-image' as string]: `url(${url})` }}
                >
                    <CardLink
                        href={`/book/${id}`}
                        aria-label="Перейти до інформації про книгу"
                    ></CardLink>
                </ImageContainer>
                <DescriptionContainer>
                    <Title>
                        <CardLink href={`/book/${id}`}>{title}</CardLink>
                    </Title>
                    <Authors>{author}</Authors>
                    <BookFormatContainer className="bookformat">
                        <BookFormat size={35} />
                    </BookFormatContainer>
                    <BottomContainer>
                        <Price>{price}₴</Price>
                        <BoxStyles className="hidden-buttons">
                            <FavoriteBtn book={book} />
                            <CartButton
                                aria-label="Додати в улюблене"
                                onClick={() => {
                                    handleAddBook();
                                    handleOpenModal('successInfo');
                                }}
                                disabled={isLoading}
                            >
                                <Icon name="cart" size={24} color="white" />
                            </CartButton>
                        </BoxStyles>
                    </BottomContainer>
                </DescriptionContainer>
            </CardContainer>
        </li>
    );
};

export default Card;
