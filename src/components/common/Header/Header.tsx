'use client';

import React, { useEffect, useRef, useState } from 'react';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import styled from 'styled-components';

import {
    AccountLink,
    Avatar,
    ControlsContainer,
    Form,
    FromDesktop,
    HeaderButton,
    HeaderContainer,
    Logo,
    LogoContainer,
    SearchButton,
    SearchInput,
    StyledWrapper,
    ToTablet,
} from './Header.styles';
import { IBook } from '@/app/book/[id]/page.types';
import { Modal } from '@/components/main/Modal';
import { SearchList } from '@/components/main/SearchList';
import {
    selectOpenModal,
    setModalContent,
    setModalStatus,
    useDispatch,
    useSelector,
} from '@/lib/redux';
import { useGetFavoritesQuantityQuery } from '@/lib/redux/features/book/bookApi';
import { getBooks } from '@/lib/redux/features/book/bookRequests';
import { BookType, IUser, Role } from '@/lib/redux/features/user/types';

import { CatalogButton } from '../../main/Hero/Hero.styles';
import { Icon } from '../Icon';

const IoMdHeartEmpty = dynamic(
    () => import('react-icons/io').then(mod => mod.IoMdHeartEmpty),
    { ssr: false }
);

const TfiPanel = dynamic(
    () => import('react-icons/tfi').then(mod => mod.TfiPanel),
    { ssr: false }
);

interface HeartIconProps {
    hasFavorites: boolean;
}

const HeartIcon = styled.div<HeartIconProps>`
    position: relative;
    display: inline-block;
    color: ${props => (props.hasFavorites ? 'red' : '#505050')};
    cursor: pointer;
`;

const FavoriteCount = styled.span`
    position: absolute;
    top: -10px;
    right: -22px;
    background: red;
    color: white;
    border-radius: 50%;
    padding: 0.2em 0.6em;
    font-size: 14px;
`;

const Header = ({ userData }: { userData: IUser | undefined }) => {
    const token =
        typeof window !== 'undefined'
            ? localStorage.getItem('accessToken')
            : null;

    const { data: favQuantity, isLoading } = useGetFavoritesQuantityQuery({
        accessToken: token ?? '',
        type: BookType.Fav,
    });
    console.log('favorite books');
    console.log(favQuantity);

    // const getBooks = useGetBooksQuery('');
    // const booksArr = getBooks.data;

    const [isOpen, setIsOpen] = useState(false);
    const [isCatalogOpen, setIsCatalogOpen] = useState(false);
    const [isSearchListOpen, setIsSearchListOpen] = useState(false);
    const searchVal = useRef<HTMLInputElement | null>(null);
    const [books, setBooks] = useState<IBook[] | undefined>();
    const router = useSearchParams();

    const dispatch = useDispatch();
    const modalOpen = useSelector(selectOpenModal);

    const handleModal = () => {
        dispatch(setModalStatus(!modalOpen));
        dispatch(setModalContent('Catalog'));
    };

    const handleCartModal = () => {
        dispatch(setModalStatus(!modalOpen));
        dispatch(setModalContent('Cart'));
    };

    const handleClick = () => {
        setIsOpen(true);
    };

    const handleSearch = async (e: any) => {
        if (e.target.value.length >= 2) {
            setIsSearchListOpen(true);
            try {
                const fetchedBooks = await getBooks({
                    selectReferenceAndTitle: true, // get only book referenceNumber & title
                });
                const filteredBooks = fetchedBooks.filter((book: IBook) =>
                    book.title
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                );
                setBooks(filteredBooks);
            } catch (error) {
                console.error('Error during search:', error);
            }
        } else {
            setIsSearchListOpen(false);
        }
    };

    useEffect(() => {
        const q = router?.get('q');
        if (q) {
            if (searchVal.current) {
                searchVal.current.value = q;
            }
        }
    }, [router]);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
    }, [isOpen]);

    useEffect(() => {
        if (isCatalogOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
    }, [isCatalogOpen]);

    const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!searchVal.current) {
            return;
        } else {
            const inputElement = searchVal.current as unknown;
            if (inputElement instanceof HTMLInputElement) {
                window.location.replace(`/books/?q=${inputElement.value}`);
            } else {
                return;
            }
        }
    };

    const favoriteCount = favQuantity;
    const hasFavorites = favQuantity && favQuantity > 0;

    useEffect(() => {
        console.log('Favorite books count:', favoriteCount);
    }, [favoriteCount]);

    return (
        <>
            <HeaderContainer>
                <StyledWrapper>
                    <ToTablet>
                        <ControlsContainer>
                            {userData ? (
                                ''
                            ) : (
                                <HeaderButton
                                    onClick={() => {
                                        handleClick();
                                    }}
                                >
                                    <Icon name="account" size={28} />
                                    Увійти
                                </HeaderButton>
                            )}
                            <HeaderButton>
                                <AccountLink
                                    href={
                                        userData
                                            ? '/account/favorites'
                                            : '/favorite' // wtf?? it should be only 1 naming
                                    }
                                >
                                    <HeartIcon hasFavorites={hasFavorites}>
                                        <IoMdHeartEmpty size={28} />
                                        {hasFavorites && (
                                            <FavoriteCount>
                                                {favoriteCount}
                                            </FavoriteCount>
                                        )}
                                    </HeartIcon>
                                    Обране
                                </AccountLink>
                            </HeaderButton>
                            <HeaderButton onClick={handleCartModal}>
                                <Icon name="cart" size={28} />
                                Кошик
                            </HeaderButton>
                            {userData ? (
                                <Avatar>
                                    <AccountLink href="/account"></AccountLink>
                                </Avatar>
                            ) : (
                                ''
                            )}
                            {(userData?.role === Role.Moderator ||
                                userData?.role === Role.Admin) && (
                                <a href="/admin">
                                    <TfiPanel size={40} color="#000" />
                                </a>
                            )}
                        </ControlsContainer>
                    </ToTablet>
                    <LogoContainer>
                        <Link href="/" aria-label="Перейти на головну сторінку">
                            <Logo name="logo_black" />
                        </Link>
                    </LogoContainer>
                    <FromDesktop>
                        <CatalogButton
                            type="submit"
                            onClick={handleModal}
                            className="z-10"
                        >
                            Категорії
                        </CatalogButton>
                    </FromDesktop>
                    <Form
                        onSubmit={e => {
                            handleSubmitSearch(e);
                        }}
                    >
                        <SearchInput
                            placeholder="Знайти"
                            onChange={e => {
                                handleSearch(e);
                            }}
                            ref={searchVal}
                        />
                        <SearchButton type="submit" aria-label="Пошук">
                            <Icon name="search" size={24} className="icon" />
                        </SearchButton>
                        {isSearchListOpen && <SearchList books={books} />}
                    </Form>
                    <FromDesktop>
                        <ControlsContainer>
                            {userData ? (
                                ''
                            ) : (
                                <HeaderButton
                                    onClick={() => {
                                        handleClick();
                                    }}
                                >
                                    <Icon name="account" size={28} />
                                    Увійти
                                </HeaderButton>
                            )}
                            <HeaderButton>
                                <AccountLink
                                    href={
                                        userData
                                            ? '/account/favorites'
                                            : '/favorite' // wtf?? it should be only 1 naming
                                    }
                                >
                                    <HeartIcon hasFavorites={hasFavorites}>
                                        <IoMdHeartEmpty size={28} />
                                        {hasFavorites && (
                                            <FavoriteCount>
                                                {favoriteCount}
                                            </FavoriteCount>
                                        )}
                                    </HeartIcon>
                                    Обране
                                </AccountLink>
                            </HeaderButton>
                            <HeaderButton onClick={handleCartModal}>
                                <Icon name="cart" size={28} />
                                Кошик
                            </HeaderButton>
                            {userData ? (
                                <Avatar>
                                    <AccountLink href="/account"></AccountLink>
                                </Avatar>
                            ) : (
                                ''
                            )}
                            {(userData?.role === Role.Moderator ||
                                userData?.role === Role.Admin) && (
                                <a href="/admin">
                                    <TfiPanel size={40} color="#000" />
                                </a>
                            )}
                        </ControlsContainer>
                    </FromDesktop>
                </StyledWrapper>
            </HeaderContainer>
            {isOpen && <Modal setIsOpen={setIsOpen} />}
        </>
    );
};

export default Header;
