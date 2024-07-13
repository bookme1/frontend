'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

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
import { DesktopCatalog } from '@/components/main/DesktopCatalog';
import { Modal } from '@/components/main/Modal';
import { SearchList } from '@/components/main/SearchList';
import { useGetBooksQuery } from '@/lib/redux/features/book/bookApi';
import { IUser } from '@/lib/redux/features/user/types';
import { Wrapper } from '@/styles/globals.styles';

import { CatalogButton } from '../../main/Hero/Hero.styles';
import { Icon } from '../Icon';

const Header = ({ userData }: { userData: IUser | undefined }) => {
  const getBooks = useGetBooksQuery('');

  const booksArr = getBooks.data;

  const [isOpen, setIsOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isSearchListOpen, setIsSearchListOpen] = useState(false);
  const [activePage, setActivePage] = useState('main');
  const searchVal = useRef<HTMLInputElement | null>(null);
  const [books, setBooks] = useState<IBook[] | undefined>();
  const router = useSearchParams();

  // #############
  // HANDLE EVENTS
  // #############
  const handleClick = () => {
    setIsOpen(true);
  };

  const handleSearch = async (e: any) => {
    if (e.target.value.length >= 2) {
      setIsSearchListOpen(true);
      const res = booksArr?.filter((book: any) =>
        book.title.toLowerCase().includes(e.target.value)
      );
      setBooks(res);
    } else {
      setIsSearchListOpen(false);
    }
  };

  const handleCatalog = (e: any) => {
    e.preventDefault();
    setIsCatalogOpen(prev => !prev);
  };

  const changePage = (page: string) => {
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
      return 0;
    } else {
      const inputElement = searchVal.current as unknown;
      if (inputElement instanceof HTMLInputElement) {
        window.location.replace(`/books/?q=${inputElement.value}`);
      } else {
        return 0;
      }
    }
    return 0;
  };

  return (
    <>
      <HeaderContainer>
        <StyledWrapper>
          <LogoContainer>
            <Link href="/">
              <Logo name="logo_black" />
            </Link>
          </LogoContainer>
          <FromDesktop>
            <CatalogButton
              type="submit"
              onClick={handleCatalog}
              className="z-10"
            >
              Каталог
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
            <SearchButton type="submit">
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
                <Icon name="heart" size={28} />
                Обране
              </AccountLink>
            </HeaderButton>
            <HeaderButton>
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
          </FromDesktop>
        </StyledWrapper>
        <NavToTablet className="scrollable_nav">
          <ScrollBehavior />
          <Wrapper>
            <NavList>
              <NavItem>
                <StyledNavLink
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
                  onClick={() => {
                    changePage('catalog');
                  }}
                  data-nav="catalog"
                >
                  <Icon name="catalog" size={24} />
                </StyledNavLink>
              </NavItem>
              <NavItem>
                <StyledNavLink data-nav="cart">
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
                <StyledNavLink data-nav="like">
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
                <StyledNavLink data-nav="account">
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
      {isCatalogOpen && <DesktopCatalog setIsOpen={setIsCatalogOpen} />}
    </>
  );
};

export default Header;
