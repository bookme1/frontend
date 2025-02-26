'use client';

import { useState } from 'react';

import Link from 'next/link';

import {
    AuthorsList,
    BottomContainer,
    CartButton,
    ContentContainer,
    Controls,
    ImageContainer,
    Price,
    StyledWrapper,
    Title,
} from './MobileCard.styles';
import FavoriteBtn from '@/components/Favorite/FavoriteBtn';
import { Icon } from '@/components/common/Icon';
import { openModal, useDispatch } from '@/lib/redux';

const MobileCard = ({ book }: { book: any }) => {
    const [addClick, setAddClick] = useState(false);
    const token = localStorage.getItem('accessToken');

    // const addCardBook = useAddBookQuery(
    //     {
    //         accessToken: token ?? '',
    //         bookId: book.id ?? '',
    //         type: BookType.Cart,
    //     },
    //     { skip: addClick === false }
    // );

    const dispatch = useDispatch();

    const handleOpenModal = (modalName: string) => {
        dispatch(openModal(modalName));
        setAddClick(true);
    };
    return (
        <>
            <StyledWrapper>
                <ImageContainer
                    style={{
                        ['--background-image' as string]: `url(${book.url})`,
                    }}
                >
                    <Link href={`book/${book.id}`}></Link>
                </ImageContainer>
                <ContentContainer>
                    <Title>
                        <Link href={`book/${book.id}`}>{book.title}</Link>
                    </Title>

                    <AuthorsList>{book.authors}</AuthorsList>
                    <BottomContainer>
                        <Price>{book.price} ₴</Price>
                        <Controls>
                            <FavoriteBtn book={book} />
                            <CartButton
                                onClick={() => {
                                    handleOpenModal('successInfo');
                                }}
                            >
                                <Icon name="cart" size={24} color="#fff" />
                            </CartButton>
                        </Controls>
                    </BottomContainer>
                </ContentContainer>
            </StyledWrapper>
        </>
    );
};

export default MobileCard;
