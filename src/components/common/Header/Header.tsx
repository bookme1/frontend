"use client";
import { Icon } from "../Icon";
import { Wrapper } from "@/styles/globals.styles";
import { Modal } from "@/components/main/Modal";
import { useEffect, useMemo, useRef, useState } from "react";
import { SearchList } from "@/components/main/SearchList";
import { CatalogButton } from "../../main/Hero/Hero.styles";
import ScrollBehavior from "./ScrollBehavior";
import { DesktopCatalog } from "@/components/main/DesktopCatalog";
import Link from "next/link";
import {
  HeaderContainer,
  StyledWrapper,
  FromDesktop,
  NavToTablet,
  Avatar,
  AccountLink,
  Logo,
  LogoContainer,
  Form,
  SearchInput,
  SearchButton,
  HeaderButton,
  NavList,
  NavItem,
  StyledNavLink,
} from "./Header.styles";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { selectBooks } from "@/lib/redux";
import { useSession } from "next-auth/react";
import {
  useGetDataMutation,
  useGoogleAuthMutation,
  useRefreshTokenMutation,
} from "@/lib/redux/features/user/userApi";
import { loginOutputDTO } from "@/lib/redux/features/user/types";

const Header = () => {
  const booksArr = useSelector(selectBooks);

  const [isOpen, setIsOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isSearchListOpen, setIsSearchListOpen] = useState(false);
  const [userData, setUserData] = useState<loginOutputDTO>();
  const [activePage, setActivePage] = useState("main");
  const searchVal = useRef<HTMLInputElement | null>(null);
  const [books, setBooks] = useState<Array<any>>([]);
  const router = useSearchParams();

  useEffect(() => {
    const q = router?.get("q");
    if (q) {
      if (searchVal.current) {
        searchVal.current.value = q;
      }
    }
  }, [router]);
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [isOpen]);
  useEffect(() => {
    if (isCatalogOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [isCatalogOpen]);

  const [
    getUserData,
    {
      data: getUserDataData,
      error: getUserDataError,
      isLoading: getUserDataLoading,
    },
  ] = useGetDataMutation();

  const [
    refreshTokens,
    {
      data: refreshTokenData,
      error: refreshTokenError,
      isLoading: refreshTokenIsLoading,
    },
  ] = useRefreshTokenMutation();

  const getData = async () => {
    if (typeof localStorage == undefined) {
      return;
    }
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken && !refreshToken) {
      return null;
    }

    try {
      if (accessToken) {
        // If we have access token -> login by access token
        console.log(accessToken);
        await getUserData(accessToken);
      }
      if (refreshToken && !getUserDataData) {
        // If access token was lost -> refresh tokens by refresh token
        await refreshTokens(refreshToken);
      }

      setUserData(data);
    } catch (error: any) {
      console.error("Error fetching user data:", error);
      if (error.status == 401 && refreshToken) {
        await refreshTokens(refreshToken); // if access token was expired -> refresh by refresh token
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleClick = () => {
    setIsOpen(true);
  };
  const handleSearch = async (e: any) => {
    if (e.target.value.length >= 2) {
      setIsSearchListOpen(true);
      const res = booksArr.filter((book: any) =>
        book.title.toLowerCase().includes(e.target.value)
      );
      setBooks(res);
    } else {
      setIsSearchListOpen(false);
    }
  };
  const handleCatalog = (e: any) => {
    e.preventDefault();
    setIsCatalogOpen((prev) => !prev);
  };
  const changePage = (page: string) => {
    const prevPage = document.querySelector(`[data-nav=${activePage}]`);
    const currentPage = document.querySelector(`[data-nav=${page}]`);
    prevPage?.classList.remove("active");
    currentPage?.classList.add("active");
    if (page == "catalog") {
      setIsCatalogOpen(true);
    } else if (activePage == "catalog") {
      setIsCatalogOpen(false);
    }
    setActivePage(page);
  };
  // ---------------------------------
  //Check if user authorized by google
  // ---------------------------------
  const session = useSession();
  const [googleSignIn, { data, error, isLoading }] = useGoogleAuthMutation();

  useEffect(() => {
    if (session && session.data?.user?.email) {
      const fetchData = async () => {
        try {
          if (session.data?.user?.email && session.data?.user?.name) {
            const { email, name } = session.data.user;
            await googleSignIn({ email, name });
            setUserData(data);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchData();
    }
  }, [session]);
  useEffect(() => {
    if (data) {
      localStorage.setItem("accessToken", data.tokens.accessToken);
      localStorage.setItem("refreshToken", data.tokens.refreshToken);
      setUserData(data);
    } else if (refreshTokenData) {
      localStorage.setItem("accessToken", refreshTokenData.tokens.accessToken);
      localStorage.setItem(
        "refreshToken",
        refreshTokenData.tokens.refreshToken
      );
      setUserData(refreshTokenData);
    }
  }, [data, refreshTokenData]);

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
            onSubmit={(e) => {
              handleSubmitSearch(e);
            }}
          >
            <SearchInput
              placeholder="Знайти"
              onChange={(e) => {
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
              ""
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
              ""
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
                    changePage("main");
                  }}
                >
                  Головна
                  <Icon name="main_page" size={24} />
                </StyledNavLink>
              </NavItem>
              <NavItem>
                <StyledNavLink
                  onClick={() => {
                    changePage("catalog");
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
                      changePage("cart");
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
                      changePage("like");
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
                      changePage("account");
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
