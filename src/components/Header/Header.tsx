"use client";
import styled from "@emotion/styled";
import { Icon } from "../Icon";
import { Wrapper, visuallyHidden } from "@/styles/globals.styles";

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
`;

const Form = styled.form`
  position: relative;
  width: 100%;
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

const Logo = styled(Icon)`
  width: 217px !important;
  height: 40px !important;
`;

const Header = () => {
  return (
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
      </StyledWrapper>
    </HeaderContainer>
  );
};

export default Header;
