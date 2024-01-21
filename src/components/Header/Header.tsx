"use client";
import styled from "@emotion/styled";
import { Icon } from "../Icon";
import { Wrapper, visuallyHidden } from "@/styles/globals.styles";
import { Modal } from "../Modal";
import { useEffect, useMemo, useState } from "react";
import { authService } from "@/api/auth/authService";

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

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState("");
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [isOpen]);
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
  return (
    <>
      <HeaderContainer>
        <StyledWrapper>
          <FromTablet>
            <Logo name="logo_black" />
          </FromTablet>
          <Form>
            <SearchInput placeholder="Знайти"></SearchInput>
            <SearchButton type="submit">
              <Icon name="search" size={24} className="icon" />
            </SearchButton>
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
          </FromDesktop>
        </StyledWrapper>
      </HeaderContainer>
      {isOpen && <Modal setIsOpen={setIsOpen} />}
    </>
  );
};

export default Header;
