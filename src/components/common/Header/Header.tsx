"use client";
import styled from "@emotion/styled";
import { Icon } from "../Icon";
import { Wrapper, visuallyHidden } from "@/styles/globals.styles";
import { Modal } from "@/components/main/Modal";
import { useEffect, useMemo, useState } from "react";
import { authService } from "@/api/auth/authService";
import baseAvatar from "@/assets/main/user.png";
import { SearchList } from "@/components/main/SearchList";
import { bookService } from "@/api/book/bookService";
import { CatalogButton } from "../../main/Hero/Hero.styles";
import ScrollBehavior from "./ScrollBehavior";
import { DesktopCatalog } from "@/components/main/DesktopCatalog";
import { useWindowSize } from "@/hooks/useWindowSize";
import Link from "next/link";

const HeaderContainer = styled.header`
  padding-top: 32px;
  margin-bottom: 16px;
`;

const StyledWrapper = styled(Wrapper)`
  @media (min-width: 768px) {
    display: flex;
    gap: 28px;
    align-items: center;
  }
  @media (min-width: 1280px) {
    gap: 53px;
  }
`;

const Form = styled.form`
  position: relative;
  width: 100%;
  @media (min-width: 1280px) {
    width: 642.5px;
  }
`;

const SearchInput = styled.input`
  border: 1px solid var(--gray_border);
  width: 100%;
  padding: 12px 0px 12px 24px;
  border-radius: 8px;
  ::placeholder {
    color: var(--gray_dark);
    font-size: 18px;
    font-weight: 600;
  }
`;

const SearchButton = styled.button`
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: var(--gray_search);
  color: black;
  position: absolute;
  top: 0;
  right: 0;
  padding: 12px 28px;
  border-top: 1px solid var(--gray_border);
  border-right: 1px solid var(--gray_border);
  border-bottom: 1px solid var(--gray_border);
  transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;
  :active {
    background-color: var(--red);
    border-color: red;
  }
  .icon {
    transition: color 0.15s ease-in-out;
  }
  :active .icon {
    color: white;
  }
`;

const FromTablet = styled.div`
  @media (max-width: 767.5px) {
    ${visuallyHidden}
  }
`;

const FromDesktop = styled.div`
  @media (max-width: 1279.5px) {
    ${visuallyHidden}
  }
  display: flex;
  gap: 40px;
  align-items: center;
`;

const HeaderButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: var(--gray_dark);
  :active {
    color: var(--red);
    fill: var(--red);
  }
`;

const Logo = styled(Icon)`
  width: 217px !important;
  height: 40px !important;
`;

const Avatar = styled.div`
  width: 54px;
  height: 54px;
  background-image: url(${baseAvatar.src});
  background-position: center;
  background-size: cover;
  border-radius: 50%;
  border: 2px solid var(--red);
`;

const AccountLink = styled.a`
  display: block;
  width: 100%;
  height: 100%;
`;

const ToTablet = styled.div`
  @media (min-width: 1280px) {
    ${visuallyHidden};
  }
`;

const NavToTablet = styled(ToTablet)`
  padding: 12px 0px;
  position: fixed;
  width: 100%;
  height: 64px;
  bottom: 0;
  left: 0;
  background-color: var(--red);
  transition: transform 0.3s;
  z-index: 100;
  box-shadow: -1px -1px 32px 0px rgba(0, 0, 0, 0.25);
`;

const NavList = styled.ul`
  display: flex;
  gap: 27px;
  align-items: center;
  @media (min-width: 768px) {
    gap: 64px;
    justify-content: center;
  }
`;

const NavItem = styled.li``;

const StyledNavLink = styled.a`
  display: flex;
  gap: 8px;
  align-items: center;
  color: white;
  border-radius: 100px;
  &.active {
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.2);
  }
`;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isSearchListOpen, setIsSearchListOpen] = useState(false);
  const [userData, setUserData] = useState("");
  const [activePage, setActivePage] = useState("main");
  const [books, setBooks] = useState<Array<any>>([]);
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
  const fetchUserData = useMemo(
    () => async () => {
      try {
        const data = await authService.getUserData();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
    []
  );
  useEffect(() => {
    fetchUserData();
  }, []);
  const handleClick = () => {
    setIsOpen(true);
  };
  const handleSearch = async (e: any) => {
    if (e.target.value.length >= 2) {
      setIsSearchListOpen(true);
      const response = await bookService.getBooks("title", e.target.value);
      setBooks(response);
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

  return (
    <>
      <HeaderContainer>
        <StyledWrapper>
          <FromTablet>
            <Link href="/">
              <Logo name="logo_black" />
            </Link>
          </FromTablet>
          <FromDesktop>
            <CatalogButton onClick={handleCatalog} className="z-10">
              Каталог
            </CatalogButton>
          </FromDesktop>
          <Form>
            <SearchInput
              placeholder="Знайти"
              onChange={(e) => {
                handleSearch(e);
              }}
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
                <Icon name="account" size={28} /> Увійти
              </HeaderButton>
            )}
            <HeaderButton>
              <Icon name="heart" size={28} /> Обране
            </HeaderButton>
            <HeaderButton>
              <Icon name="cart" size={28} /> Кошик
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
