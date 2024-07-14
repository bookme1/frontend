import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import {
    Author,
    CartBtn,
    Container,
    DataBox,
    FooterBox,
    ItemBox,
    ListBox,
    Price,
    SpanBox,
    StyledImage,
    Text,
    Title,
    Trash,
} from './Basket.styles';
import { GenericModal } from '@/components/GenericModal/GenericModal';
import { useGetBooksQuery } from '@/lib/redux/features/book/bookApi';
import { BookType } from '@/lib/redux/features/user/types';
import {
    useGetUserBooksQuery,
    useRemoveBookQuery,
} from '@/lib/redux/features/user/userApi';

const Basket = () => {
    const token = localStorage.getItem('accessToken');

    const { data: cartData } = useGetUserBooksQuery({
        accessToken: token ?? '',
        type: BookType.Cart,
    });

    const { data: booksData } = useGetBooksQuery('');

    const [cartBooksArr, setCartBooksArr] = useState([]);
    const [sum, setSum] = useState(null);
    const [delClick, setDelClick] = useState(false);
    const [removeId, setRemoveId] = useState();

    useEffect(() => {
        cartData
    });

    useEffect(() => {
        if (cartData && booksData) {
            const filteredBooks: any = booksData.filter(
                (book: { id: string }) => cartData.includes(book.id)
            );
            setCartBooksArr(filteredBooks);
        }
    }, [cartData, booksData, delClick]);

    useEffect(() => {
        if (cartBooksArr.length > 0) {
            const totalSum: any = cartBooksArr.reduce(
                (acc, book) => acc + parseFloat(book.price),
                0
            );
            setSum(totalSum);
        }
    }, [cartBooksArr]);

    const cartCheck = Array.isArray(cartData) && cartData.length > 0;

    const removeCartBook = useRemoveBookQuery(
        {
            accessToken: token ?? '',
            bookId: removeId ?? '',
            type: BookType.Cart,
        },
        {
            skip: delClick === false,
        }
    );

    const handleDelFromCart = (id: any) => {
        setRemoveId(id);
        setDelClick(true);
    };

    return (
        <GenericModal modalName="cart" align="right">
            <Container>
                <Text>Кошик</Text>
                <ListBox>
                    {cartCheck &&
                        cartBooksArr.map((book: any) => (
                            <ItemBox key={book.id}>
                                <StyledImage
                                    src={book.url}
                                    alt={book.title}
                                    width={120}
                                    height={160}
                                    quality={75}
                                    style={{ objectFit: 'contain' }}
                                />
                                <DataBox>
                                    <Title>{book.title}</Title>
                                    <Author>{book.author}</Author>
                                    <Price>{book.price}</Price>
                                </DataBox>
                                <Trash
                                    onClick={() => {
                                        handleDelFromCart(book.id);
                                    }}
                                />
                            </ItemBox>
                        ))}
                </ListBox>
                <FooterBox>
                    <SpanBox>
                        <Text>Всього:</Text>
                        <Text>{sum} &#x20B4;</Text>
                    </SpanBox>
                    <CartBtn>Оформити замовлення</CartBtn>
                </FooterBox>
            </Container>
        </GenericModal>
    );
};

export default Basket;
