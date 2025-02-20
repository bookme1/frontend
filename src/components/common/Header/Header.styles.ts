
'use client';

import styled from '@emotion/styled';


import baseAvatar from '@/assets/main/user.png';
import { visuallyHidden } from '@/styles/globals.styles';
import { Wrapper } from '@/styles/globals.styles';

import { Icon } from '../Icon';

export const HeaderContainer = styled.header`
    padding-top: 32px;
    margin-bottom: 16px;
`;

export const StyledWrapper = styled(Wrapper)`
    @media (min-width: 768px) {
        display: flex;
        gap: 28px;
        align-items: center;
        flex-direction: row;
        flex-wrap: wrap;
    }
    @media (min-width: 1280px) {
        gap: 53px;
    }
`;

export const ControlsContainer = styled.div`
    @media (min-width: 768px) {
        display: flex;
        justify-content: flex-end;
        gap: 20px;
        align-items: center;
    }
`;

export const Form = styled.form`
    position: relative;
    width: 100%;
    @media (min-width: 768px) {
     min-width: 400px;
    
    }
    @media (min-width: 1280px) {
        width: 411px;
    }
`;

export const FlexRow = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    @media (min-width: 768px) {
        width: calc(100% - 345px);
    
    }

    @media (min-width: 1280px) {
        width: auto;
    
    }
`;

export const SearchInput = styled.input`
    border: 1px solid var(--gray_border);
    width: 100%;
    padding: 12px 0px 12px 24px;
    border-radius: 8px;
    ::placeholder {
        color: var(--gray_dark);
        font-size: 18px;
        font-weight: 600;
    }

    @media (max-width: 767.5px) {
        height: 40px;
    }
`;

export const SearchButton = styled.button`
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
    transition:
        background-color 0.15s ease-in-out,
        color 0.15s ease-in-out;
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

    @media (max-width: 767.5px) {
        height: 40px;
        padding: 7px 14px;

        // active styles
        background-color: var(--red);
        border-color: red;
        .icon {
            color: white;
        }
    }
`;

export const BurgerButton = styled.button`
    height: 40px;
    width: 40px;

    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;

    border: 1px solid var(--red);

    @media (min-width: 767.5px) {
        height: 50px;
        width: 50px;
    }
`;

export const LogoContainer = styled.div`
    @media (max-width: 767.5px) {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
    }
`;

export const FromDesktop = styled.div`
    @media (max-width: 1279.5px) {
        ${visuallyHidden}
    }
    display: flex;
    gap: 40px;
    align-items: center;
`;

export const HeaderButton = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
    color: var(--gray_dark);
    cursor: pointer;
    :active {
        color: var(--red);
        fill: var(--red);
    }
`;

export const Logo = styled(Icon)`
    width: 217px !important;
    height: 40px !important;
`;

export const Avatar = styled.div`
    width: 54px;
    height: 54px;
    background-image: url(${baseAvatar.src});
    background-position: center;
    background-size: cover;
    border-radius: 50%;
    border: 2px solid var(--red);
`;

export const AccountLink = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 4px;

    width: 100%;
    height: 100%;
`;

export const ToTablet = styled.div`
    width: 100%;
    @media (min-width: 1280px) {
        ${visuallyHidden};
    }
`;

export const NavToTablet = styled(ToTablet)`
    padding: 12px 0px;
    position: fixed;
    width: 100%;
    height: 64px;
    top: 0;
    left: 0;
    background-color: var(--red);
    transition: transform 0.3s;
    z-index: 100;
    box-shadow: -1px -1px 32px 0px rgba(0, 0, 0, 0.25);
`;

export const NavList = styled.ul`
    display: flex;
    gap: 27px;
    align-items: center;
    @media (min-width: 768px) {
        gap: 64px;
        justify-content: center;
    }
`;

export const NavItem = styled.li``;

export const StyledNavLink = styled.a`
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
