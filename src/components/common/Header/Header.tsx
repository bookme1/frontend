'use client';

import React, { useEffect, useRef, useState } from 'react';
import { TfiPanel } from 'react-icons/tfi';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import styled from 'styled-components';

import {
    AccountLink,
    Avatar,
    Form,
    FromDesktop,
    HeaderButton,
    HeaderContainer,
    Logo,
    LogoContainer,
    NavItem,
    NavList,
    NavToTablet,
    SearchButton,
    SearchInput,
    StyledNavLink,
    StyledWrapper,
} from './Header.styles';
import ScrollBehavior from './ScrollBehavior';
import { IBook } from '@/app/book/[id]/page.types';
import { Modal } from '@/components/main/Modal';
import { SearchList } from '@/components/main/SearchList';
import {
    openModal,
    selectOpenModal,
    setModalContent,
    setModalStatus,
    useDispatch,
    useSelector,
} from '@/lib/redux';
import { useGetFavoritesQuery } from '@/lib/redux/features/book/bookApi';
// import { useGetBooksQuery } from '@/lib/redux/features/book/bookApi';
import { getBooks } from '@/lib/redux/features/book/bookRequests';
import { BookType, IUser, Role } from '@/lib/redux/features/user/types';
import { RootState } from '@/lib/redux/store';
import { Wrapper } from '@/styles/globals.styles';

import { CatalogButton } from '../../main/Hero/Hero.styles';
import { Icon } from '../Icon';

interface HeartIconProps {
    hasFavorites: boolean;
}

const HeartIcon = styled.div<HeartIconProps>`
    position: relative;
    display: inline-block;
    color: ${props => (props.hasFavorites ? 'red' : 'grey')};
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

    const { data: favoriteBooks, isLoading } = useGetFavoritesQuery({
        accessToken: token ?? '',
        type: BookType.Fav,
    });

    // const getBooks = useGetBooksQuery('');
    // const booksArr = getBooks.data;

    const [isOpen, setIsOpen] = useState(false);
    const [isCatalogOpen, setIsCatalogOpen] = useState(false);
    const [isSearchListOpen, setIsSearchListOpen] = useState(false);
    const [activePage, setActivePage] = useState('main');
    const searchVal = useRef<HTMLInputElement | null>(null);
    const [books, setBooks] = useState<IBook[] | undefined>();
    const router = useSearchParams();

    const dispatch = useDispatch();
    const modalOpen = useSelector(selectOpenModal);

    const handleModal = () => {
        dispatch(setModalStatus(!modalOpen));
        dispatch(setModalContent('Catalog'));
    };

    const handleOpenModal = (content: string) => {
        dispatch(setModalStatus(true));
        dispatch(setModalContent(content));
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

    const handleCatalog = (e: any) => {
        e.preventDefault();
        setIsCatalogOpen(prev => !prev);
    };

    const changePage = (page: string) => {
        if (typeof window === 'undefined') {
            return 0;
        }
        const prevPage = document.querySelector(`[data-nav=${activePage}]`);
        const currentPage = document.querySelector(`[data-nav=${page}]`);
        prevPage?.classList.remove('active');
        currentPage?.classList.add('active');
        if (page === 'catalog') {
            setIsCatalogOpen(true);
        } else if (activePage === 'catalog') {
            setIsCatalogOpen(false);
        }
        setActivePage(page);
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

    const favoriteCount = favoriteBooks?.length ?? 0;
    const hasFavorites = favoriteCount > 0;

    useEffect(() => {
        console.log('Favorite books count:', favoriteCount);
    }, [favoriteCount]);

    return (
        <>
            <HeaderContainer>
                <StyledWrapper>
                    <LogoContainer>
                        <Link href="/" aria-label="Link to main page">
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
                        <SearchButton type="submit" aria-label="Search">
                            <Icon name="search" size={24} className="icon" />
                        </SearchButton>
                        {isSearchListOpen && <SearchList books={books} />}
                    </Form>
                    <FromDesktop>
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
                            <AccountLink href="/favorite">
                                <HeartIcon hasFavorites={hasFavorites}>
                                    <Icon name="heart" size={28} />
                                    {hasFavorites && (
                                        <FavoriteCount>
                                            {favoriteCount}
                                        </FavoriteCount>
                                    )}
                                </HeartIcon>
                                Обране
                            </AccountLink>
                        </HeaderButton>
                        <HeaderButton
                            onClick={() => {
                                handleOpenModal('cart');
                            }}
                        >
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
                    </FromDesktop>
                </StyledWrapper>
                <NavToTablet className="scrollable_nav">
                    <ScrollBehavior />
                    <Wrapper>
                        <NavList>
                            <NavItem>
                                <StyledNavLink
                                    aria-label="Main page"
                                    className="active"
                                    data-nav="main"
                                    onClick={() => {
                                        changePage('main');
                                    }}
                                >
                                    Головна
                                    <Icon name="main_page" size={24} />
                                </StyledNavLink>
                            </NavItem>
                            <NavItem>
                                <StyledNavLink
                                    aria-label="Link to catalog"
                                    onClick={() => {
                                        changePage('catalog');
                                    }}
                                    data-nav="catalog"
                                >
                                    <Icon name="catalog" size={24} />
                                </StyledNavLink>
                            </NavItem>
                            <NavItem>
                                <StyledNavLink
                                    data-nav="cart"
                                    aria-label="Link to cart"
                                >
                                    <Icon
                                        name="cart"
                                        size={24}
                                        onClick={() => {
                                            changePage('cart');
                                        }}
                                    />
                                </StyledNavLink>
                            </NavItem>
                            <NavItem>
                                <StyledNavLink
                                    data-nav="like"
                                    aria-label="Link to favorites"
                                >
                                    <Icon
                                        name="heart"
                                        size={24}
                                        onClick={() => {
                                            changePage('like');
                                        }}
                                    />
                                </StyledNavLink>
                            </NavItem>
                            <NavItem>
                                <StyledNavLink
                                    data-nav="account"
                                    aria-label="Link to my account"
                                >
                                    <Icon
                                        name="account"
                                        size={24}
                                        onClick={() => {
                                            changePage('account');
                                        }}
                                    />
                                </StyledNavLink>
                            </NavItem>
                        </NavList>
                    </Wrapper>
                </NavToTablet>
            </HeaderContainer>
            {isOpen && <Modal setIsOpen={setIsOpen} />}
        </>
    );
};

export default Header;
