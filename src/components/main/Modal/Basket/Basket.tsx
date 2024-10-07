import React, { useState } from 'react';

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
import { useGetFavoritesQuery } from '@/lib/redux/features/book/bookApi';
import { BookType } from '@/lib/redux/features/user/types';

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

    return (
        <div>
            <Container>
                <Text>Кошик</Text>
                <ListBox>
                    {cart &&
                        !isLoading &&
                        cart.cart.length > 0 &&
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
                        <Text>{4} &#x20B4;</Text>
                    </SpanBox>
                    <CartBtn>Оформити замовлення</CartBtn>
                </FooterBox>
            </Container>
        </div>
    );
};

export default Basket;
