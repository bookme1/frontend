'use client';

import { useState } from 'react';

import {
    Authors,
    BookFormatContainer,
    BookLink,
    BottomContainer,
    BoxStyles,
    CardContainer,
    CardLink,
    CartButton,
    DescriptionContainer,
    ImageContainer,
    Price,
    Title,
} from './CardBought.styles';
import { IBook } from '@/app/book/[id]/page.types';
import { BookFormat } from '@/components/BookFormat';
import FavoriteBtn from '@/components/Favorite/FavoriteBtn';
import { openModal, useDispatch, useSelector } from '@/lib/redux';
import { BookType } from '@/lib/redux/features/user/types';
import { useAddBookQuery } from '@/lib/redux/features/user/userApi';

import { lazyloadExp } from '../Card/lazyload';
import { Icon } from '../Icon';

const CardBought = ({
    book,
    epubLink,
    pdfLink,
    mobiLink,
}: {
    book: IBook | undefined;
    epubLink: string | undefined;
    pdfLink: string | undefined;
    mobiLink: string | undefined;
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
                    <Price>Скачати</Price>
                    <BottomContainer>
                        <BoxStyles>
                            {mobiLink && (
                                <BookLink href={mobiLink}>mobi</BookLink>
                            )}
                            {pdfLink && <BookLink href={pdfLink}>pdf</BookLink>}
                            {epubLink && (
                                <BookLink href={epubLink}>epub</BookLink>
                            )}
                        </BoxStyles>
                    </BottomContainer>
                </DescriptionContainer>
            </CardContainer>
        </>
    );
};

export default CardBought;
