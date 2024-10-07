'use client';

import { useEffect, useState } from 'react';

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

    // Отримання обраних книг
    const { data: favorites, refetch: refetchFavorites } = useGetFavoritesQuery(
        {
            accessToken: token ?? '',
            type: BookType.Fav,
        }
    );
    const [isFavAlready, setIsFavAlready] = useState<boolean>(
        favorites ? favorites.some((fav: any) => fav === id) : false
    );

    useEffect(() => {
        if (favorites) {
            setIsFavAlready(favorites.some((fav: any) => fav === id));
        } else {
            setIsFavAlready(false);
        }
    }, [favorites, id]);

    const handleAddBook = () => {
        addBook({
            accessToken: token ?? '',
            bookId: id ?? '',
            type: BookType.Cart,
        });
    };

    const modals = useSelector((state: any) => state.modals.modals);
    const dispatch = useDispatch();
    const handleOpenModal = (modalName: string) => {
        dispatch(openModal(modalName));
    };

    const handleFavoriteToggle = () => {
        refetchFavorites();
    };

    return (
        <div style={{ height: 455 }}>
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
                            <FavoriteBtn
                                book={book}
                                isFavAlready={isFavAlready}
                                onToggleFavorite={handleFavoriteToggle}
                            />
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
        </div>
    );
};

export default Card;
