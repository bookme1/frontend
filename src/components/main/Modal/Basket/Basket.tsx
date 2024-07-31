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
import { IBook as IBookFromPage } from '@/app/book/[id]/page.types';
import { GenericModal } from '@/components/GenericModal/GenericModal';
import { useGetBooksQuery } from '@/lib/redux/features/book/bookApi';
import { BookType } from '@/lib/redux/features/user/types';
import {
    useGetUserBooksQuery,
    useRemoveBookQuery,
} from '@/lib/redux/features/user/userApi';

// Імпортуємо з абсолютним шляхом

interface IBook {
    id: string;
    title: string;
    author: string;
    price: string; // Залишаємо як string
    url: string;
}

const Basket: React.FC = () => {
    const token = localStorage.getItem('accessToken');

    const { data: cartData } = useGetUserBooksQuery({
        accessToken: token ?? '',
        type: BookType.Cart,
    });

    const { data: booksData } = useGetBooksQuery('');

    const [cartBooksArr, setCartBooksArr] = useState<IBook[]>([]);
    const [sum, setSum] = useState<number | null>(null);
    const [delClick, setDelClick] = useState<boolean>(false);
    const [removeId, setRemoveId] = useState<string | undefined>();

    useEffect(() => {
        if (cartData && booksData) {
            const filteredBooks: IBook[] = (booksData as IBookFromPage[])
                .filter((book: IBookFromPage) => cartData.includes(book.id))
                .map(book => ({
                    id: book.id,
                    title: book.title,
                    author: book.author,
                    price: book.price.toString(), // Перетворення number на string
                    url: book.url,
                }));
            setCartBooksArr(filteredBooks);
        }
    }, [cartData, booksData, delClick]);

    useEffect(() => {
        if (cartBooksArr.length > 0) {
            const totalSum: number = cartBooksArr.reduce(
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

    const handleDelFromCart = (id: string) => {
        setRemoveId(id);
        setDelClick(true);
    };

    return (
        <GenericModal modalName="cart" align="right">
            <Container>
                <Text>Кошик</Text>
                <ListBox>
                    {cartCheck &&
                        cartBooksArr.map(book => (
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
