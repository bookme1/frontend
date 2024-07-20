'use client';

import { useState } from 'react';

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
import { BookType } from '@/lib/redux/features/user/types';
import { useAddBookQuery } from '@/lib/redux/features/user/userApi';

import { Icon } from '../Icon';

const Card = ({
    book,
    favorite,
}: {
    book: IBook | undefined;
    favorite: any;
}) => {
    let initialBook;
    if (!book)
        initialBook = { title: '1', url: '1', price: 0, author: '1', id: '1' };
    else initialBook = book;

    const { title, url, price, author, id } = initialBook;
    lazyloadExp();

    const [addClick, setAddClick] = useState(false);
    const token = localStorage.getItem('accessToken');

    const addCardBook = useAddBookQuery(
        {
            accessToken: token ?? '',
            bookId: id ?? '',
            type: BookType.Cart,
        },
        { skip: addClick === false }
    );

    const isFavAlredy = favorite?.some((fav: any) => initialBook.id === fav);

    const modals = useSelector((state: any) => state.modals.modals);
    const dispatch = useDispatch();
    const handleOpenModal = (modalName: string) => {
        dispatch(openModal(modalName));
        setAddClick(true);
    };

    return (
        <>
            <CardContainer>
                <ImageContainer
                    className="lazyload"
                    style={{ ['--background-image' as string]: `url(${url})` }}
                >
                    <CardLink href={`/book/${id}`}></CardLink>
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
                            <FavoriteBtn
                                book={book}
                                isFavAlredy={isFavAlredy}
                            />
                            <CartButton
                                onClick={() => {
                                    handleOpenModal('successInfo');
                                }}
                            >
                                <Icon name="cart" size={24} color="white" />
                            </CartButton>
                        </BoxStyles>
                    </BottomContainer>
                </DescriptionContainer>
            </CardContainer>
        </>
    );
};

export default Card;
