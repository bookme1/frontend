'use client';

import React, { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

import {
    Author,
    AuthorsList,
    Controls,
    ImageContainer,
    InfoContainer,
    MainInfoContainer,
    Price,
    StyledImage,
    StyledWrapper,
    Title,
    ToCart,
    ToFavorite,
} from './MainInformation.styles';
import { useBookService } from '@/api/book/bookService';
import { IBook } from '@/app/book/[id]/page.types';
import FavoriteBtn from '@/components/Favorite/FavoriteBtn';
import Notify from '@/components/Notify/Notify';
import { NotificationState } from '@/components/Notify/NotifyType';
import { Icon } from '@/components/common/Icon';
import { useWindowSize } from '@/hooks/useWindowSize';
import { openModal } from '@/lib/redux';
import {
    useAddCartMutation,
    useGetCartQuantityQuery,
} from '@/lib/redux/features/book/bookApi';
import { BookType } from '@/lib/redux/features/user/types';
import { Wrapper } from '@/styles/globals.styles';

import { Characteristics } from '../Characteristics';
import { ICharacteristics } from '../Characteristics/Characteristics.types';
import { Formats } from '../Formats';

const MainInformation = ({
    book,
    characteristics,
    isAuthorized,
}: {
    book: IBook;
    characteristics: ICharacteristics;
    isAuthorized: boolean;
}) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [checkedFormats, setCheckedFormats] = useState<string[]>([]);

    const { makeTestCheckout, makeCartCheckout, makeWatermarking, makeOrder } =
        useBookService();

    const { data: cartQuantity, refetch: refetchCartQuantity } =
        useGetCartQuantityQuery({
            type: BookType.Cart,
        });

    const [notification, setNotification] = useState<NotificationState>({
        isVisible: false,
        text: '',
        type: 'information',
    });

    const updateNotification = (newValues: Partial<typeof notification>) => {
        setNotification(prev => ({ ...prev, ...newValues }));
    };

    const router = usePathname();
    const id = router?.split('/').pop();

    useEffect(() => {
        if (book?.url) {
            setImageLoaded(true);
        }
    }, [book?.url]);

    const [addCart] = useAddCartMutation();

    const handleAddBook = async () => {
        if (!isAuthorized) {
            updateNotification({
                isVisible: true,
                text: 'Для додавання у кошик, спочатку потрібно увійти в аккаунт',
                type: 'error',
            });
            return;
        }
        if (notification.isVisible) {
            setNotification(prev => ({ ...prev, isVisible: false }));
        }
        try {
            await addCart({
                bookId: book.id,
                type: BookType.Cart,
            });

            updateNotification({
                isVisible: true,
                text: 'Книга успішно додана до кошика!',
                type: 'success',
            });
        } catch (error) {
            console.error(`Failed to add book to cart. ${error}`);
            updateNotification({
                isVisible: true,
                text: `Помилка при додаванні книги до кошика. Помилка #2001`,
                type: 'error',
            });
        }
    };

    const handleCheckout = async () => {
        refetchCartQuantity();
        if (checkedFormats.length === 0) {
            updateNotification({
                isVisible: true,
                text: `Оберіть формати книг, які ви хочете придбати!`,
                type: 'error',
            });
            return;
        }
        if (!isAuthorized) {
            updateNotification({
                isVisible: true,
                text: `Щоб отримати необмежений доступ до книги (і користуватись нашим рідером) будь ласка, увійдіть в акаунт!`,
                type: 'error',
            });
            return;
        }
        const order_id = uuidv4();

        makeTestCheckout(book.price, order_id, updateNotification);

        const transaction_id = await makeWatermarking(
            checkedFormats.join(','),
            book.referenceNumber,
            order_id
        );
        if (transaction_id) {
            console.log('transaction successful');
        } else {
            console.log(transaction_id);
            console.log('oshibka');

            updateNotification({
                isVisible: true,
                text: `Помилка при нанесенні вотермарки!`,
                type: 'error',
            });
            updateNotification({
                isVisible: true,
                text: `Будь ласка, зв'яжіться з адміністратором сайту!`,
                type: 'error',
            });
        }

        await makeOrder(
            order_id,
            checkedFormats.join(','),
            transaction_id,
            book.referenceNumber,
            book.price
        );
    };

    const aviableFormats = [false, false, false];

    if (book.formatMobi) aviableFormats[1] = true;
    if (book.formatPdf) aviableFormats[0] = true;
    if (book.formatEpub) aviableFormats[2] = true;

    const screenWidth = useWindowSize().width;

    const getAuthorsMarkup = (authors: string) => {
        if (authors === undefined) return;
        const authorsArr = authors.split(',');
        return authorsArr.map(author => <Author key={author}>{author}</Author>);
    };

    const authorsMarkup = getAuthorsMarkup(book.author);
    return (
        <>
            <StyledWrapper>
                <ImageContainer>
                    {imageLoaded && book?.url && (
                        <StyledImage
                            src={
                                book.url.startsWith('http')
                                    ? book.url
                                    : `/${book.url}`
                            }
                            alt={book.title}
                            width={250}
                            height={330}
                        />
                    )}
                </ImageContainer>
                <InfoContainer>
                    <MainInfoContainer>
                        <Title>{book?.title}</Title>
                        <AuthorsList>{authorsMarkup}</AuthorsList>
                        <Price>{book?.price} ₴</Price>
                        {notification.isVisible && (
                            <Notify
                                text={notification.text}
                                duration={5}
                                type={notification.type}
                            />
                        )}
                        <Controls>
                            <ToCart
                                onClick={() => {
                                    openModal('cart');
                                    handleAddBook();
                                    refetchCartQuantity();
                                }}
                            >
                                <Icon name="cart" size={28} />В кошик
                            </ToCart>
                            <ToCart onClick={handleCheckout}>
                                Купити зараз
                            </ToCart>
                            <ToFavorite>
                                <FavoriteBtn book={book} />
                            </ToFavorite>
                        </Controls>
                        <Formats
                            setChecked={setCheckedFormats}
                            pdf={aviableFormats[0]}
                            mobi={aviableFormats[1]}
                            epub={aviableFormats[2]}
                        />
                    </MainInfoContainer>
                    {screenWidth &&
                        (screenWidth < 768 || screenWidth >= 1280) && (
                            <Characteristics
                                characteristics={characteristics}
                            />
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
