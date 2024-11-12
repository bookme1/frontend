import React, { useState } from 'react';

import Image from 'next/image';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix';

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
import { bookService } from '@/api/book/bookService';
import emptyBasket from '@/assets/modal/empty_basket.svg';
import { useGetFavoritesQuery } from '@/lib/redux/features/book/bookApi';
import { BookType } from '@/lib/redux/features/user/types';

import { CatalogButton } from '../../Hero/Hero.styles';

interface IBook {
    id: string;
    title: string;
    author: string;
    price: string; // Залишаємо як string
    url: string;
}

const Basket: React.FC = () => {
    const token = localStorage.getItem('accessToken');
    const [books, setBooks] = useState<IBook[]>([]);

    const {
        data: cart,
        error,
        isLoading,
    } = useGetFavoritesQuery(
        {
            accessToken: token ?? '',
            type: BookType.Cart,
        },
        { skip: token == null }
    );

    const cartSum = cart?.cart.reduce(
        (total, book) => total + Number(book.price),
        0
    );

    const handleCheckout = async () => {
        // if (!isAuthorized) {
        //     Notiflix.Notify.failure(
        //         'Щоб отримати необмежений доступ до книги (і користуватись нашим рідером) будь ласка, увійдіть в акаунт!'
        //     );
        //     return;
        // }
        const accessToken = localStorage.getItem('accessToken');
        const data = await bookService.makeCartCheckout(accessToken || '');

        const watermarking_response = await bookService.makeCartWatermarking(
            data.order_id
        );
        if (Array.isArray(watermarking_response)) {
            console.log('transaction successful');
        } else {
            Notify.failure(
                'Помилка при нанесенні вотермарки! Будь ласка, зв&apos;яжіться з адміністратором сайту'
            );
        }
    };

    return (
        <div>
            <Container>
                <Text className="title">Кошик</Text>
                {!cart?.cart.length ? (
                    <div style={{ width: 370, margin: '0 auto' }}>
                        <p
                            style={{
                                marginTop: 31,
                                textAlign: 'center',
                                fontSize: 20,
                            }}
                        >
                            Немає жодної книги?
                        </p>
                        <Image
                            style={{ margin: '0 auto', marginTop: 24 }}
                            src={emptyBasket.src}
                            alt="A beautiful girl in red sweater with books"
                            width={322}
                            height={344}
                        />
                        <p
                            style={{
                                marginTop: 24,
                                textAlign: 'center',
                                fontSize: 18,
                            }}
                        >
                            Порожній кошик - твоя можливість для нових книжкових
                            відкриттів!
                        </p>
                        <CatalogButton style={{ marginTop: 32, width: '100%' }}>
                            До каталогу
                        </CatalogButton>
                    </div>
                ) : (
                    <>
                        <ListBox>
                            {cart &&
                                cart.cart.map(book => (
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
                                        // onClick={() => {
                                        //     handleDelFromCart(book.id);
                                        // }}
                                        />
                                    </ItemBox>
                                ))}
                        </ListBox>
                        <FooterBox>
                            <SpanBox>
                                <Text>Всього:</Text>
                                <Text>{cartSum} &#x20B4;</Text>
                            </SpanBox>
                            <CartBtn onClick={handleCheckout}>
                                Оформити замовлення
                            </CartBtn>
                        </FooterBox>
                    </>
                )}
            </Container>
        </div>
    );
};

export default Basket;
