'use client';

import styled from '@emotion/styled';

import desktopHero from '@/assets/main/hero_desktop.webp';
import mobileHero from '@/assets/main/hero_mobile.webp';
import tabletHero from '@/assets/main/hero_tablet.webp';
import { Wrapper, visuallyHidden } from '@/styles/globals.styles';

import { Icon } from '../../common/Icon';

export const HeroSection = styled.section`
    margin-bottom: 132px;
`;

export const HeroWrapper = styled(Wrapper)`
    @media (min-width: 768px) {
        display: flex;
        gap: 27px;
    }
    @media (min-width: 1280px) {
        gap: 30px;
    }
`;

export const NavContainer = styled.nav`
    width: 100%;
    @media (min-width: 768px) {
        width: 240px;
    }
    &.navigation {
        padding-top: 24px;
        @media (max-width: 767.5px) {
            ${visuallyHidden}
        }
        width: 220px;
        @media (min-width: 1280px) {
            width: 240px;
            padding-top: 40px;
        }
    }
`;

export const NavList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 48px;
`;

export const NavItem = styled.li`
    .accent {
        color: var(--red);
    }
`;

export const NavLink = styled.a`
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: color 0.15s;
    :hover {
        color: var(--red);
    }
    .icon {
        transition:
            transform 0.5s cubic-bezier(0.14, 0.77, 0.53, 0.99),
            color 0.15s;
    }
    :hover .icon {
        transform: translateX(75%);
        color: var(--red);
    }
    @media (min-width: 1280px) {
        font-size: 18px;
    }

    &.footer {
        font-size: 20px;
    }
`;

export const ImageContainer = styled.div`
    width: 100%;
    margin: 0 auto;
    height: 420px;
    background-image: url(${mobileHero.src});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 20px;
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media (min-width: 768px) {
        width: 481px;
        height: 438px;
        background-image: url(${tabletHero.src});
        display: block;
        padding-top: 54px;
        padding-left: 54px;
    }
    @media (min-width: 1280px) {
        width: 944px;
        height: 480px;
        background-image: url(${desktopHero.src});
        padding-top: 150px;
        padding-left: 80px;
    }
`;

export const HeroTitle = styled.h1`
    margin-left: 30px;
    font-size: 32px;
    font-weight: 700;
    line-height: 140%;
    width: 50%;
    @media (min-width: 768px) {
        width: 100%;
        margin-left: 0;
        margin-bottom: 8px;
    }
    @media (min-width: 1280px) {
        font-size: 40px;
    }
`;

export const HeroDescription = styled.p`
    @media (max-width: 767.5px) {
        ${visuallyHidden}
    }
    width: 302px;
    color: var(--gray);
    margin-bottom: 187px;
    @media (min-width: 1280px) {
        font-size: 20px;
        margin-bottom: 40px;
    }
`;

export const CatalogButton = styled.a`
    width: 100%;
    height: 54px;
    background-color: var(--red);
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    color: #fff;
    font-weight: 700;
    transition: background-color 0.15s cubic-bezier(0.17, 0.67, 0.83, 0.67);
    cursor: pointer;

    :hover {
        background-color: #e62e2e;
    }
    :active {
        background-color: #cc2929;
    }
    @media (min-width: 768px) {
        width: 163px;
        height: 46px;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    @media (min-width: 1280px) {
        font-size: 16px;
    }

    &.footer {
        border-radius: 8px;
        height: 46px;
        @media (min-width: 768px) {
            margin-top: 114px;
        }
    }
`;

export const NavIcon = styled(Icon)``;
