'use client';

import { GoTrash } from 'react-icons/go';

import styled from '@emotion/styled';
import Image from 'next/image';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: 90vh;
    width: 375px;
    padding-top: 16px;
    background-color: white;
    position: relative;
    border-radius: 20px;

    @media (min-width: 768px) {
        padding-top: 24px;
        width: 494px;
        /* height: 959px; */
    }

    @media (min-width: 1280px) {
        width: 494px;
        /* height: 695px; */
    }
`;

export const CartBtn = styled.button`
    margin-top: 16px;

    /* width: 343px; */
    height: 46px;
    background-color: var(--red);
    border-radius: 8px;
    font-size: 16px;
    color: #fff;
    font-weight: 700;
    transition: background-color 0.15s cubic-bezier(0.17, 0.67, 0.83, 0.67);
    :hover {
        background-color: #e62e2e;
    }
    :active {
        background-color: #cc2929;
    }
    @media (min-width: 768px) {
        width: 446px;
        border-radius: 8px;

        margin-top: 24px;
    }
    @media (min-width: 1280px) {
        font-size: 16px;
    }
`;

export const FooterBox = styled.div`
    box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.15);
    width: 100%;
    max-height: 117px;
    padding: 16px;

    @media (min-width: 768px) {
        max-height: 154px;
        padding: 24px;
    }

    @media (min-width: 1280px) {
    }
`;

export const SpanBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (min-width: 768px) {
    }

    @media (min-width: 1280px) {
    }
`;

export const Text = styled.span`
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    font-variant-numeric: lining-nums;

    @media (min-width: 768px) {
        font-size: 24px;
    }

    @media (min-width: 1280px) {
        &.title {
            margin-bottom: 32px;
        }
    }
`;

export const Title = styled.p`
    font-size: 16px;
    font-weight: 700;

    @media (min-width: 768px) {
        font-size: 20px;
    }
`;

export const Author = styled.p`
    font-size: 16px;
    font-weight: 500;
    color: #6e646d;
`;

export const Price = styled.p`
    font-variant-numeric: lining-nums;
    font-size: 24px;
    font-weight: 700;
`;

export const StyledImage = styled(Image)`
    width: 120px;
    height: 160px;
    border-radius: 10px;

    object-fit: contain;
`;

export const DataBox = styled.div`
    /* display:flex;
flex-direction: column; */
`;

export const ItemBox = styled.li`
    border-top: 1px solid #f4f4f4;
    position: relative;
    list-style: none;
    max-height: 631px;
    overflow-y: auto;
    display: flex;
    gap: 20px;
    padding: 20px 0;
    @media (min-width: 768px) {
        max-height: 805px;
    }

    @media (min-width: 1280px) {
        max-height: 541px;
    }
`;

export const ListBox = styled.ul`
    max-height: 631px;
    padding: 0 24px;
    width: 100%;
    margin: 0 auto;
    overflow-y: scroll;

    &::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: #f5f5f5;
    }

    &::-webkit-scrollbar {
        width: 5px;
        background-color: #f5f5f5;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: gray;
    }

    @media (min-width: 768px) {
        max-height: 805px;
    }

    @media (min-width: 1280px) {
        max-height: 541px;
    }
`;

export const Trash = styled(GoTrash)`
    width: 24px;
    height: 24px;
    fill: #6e646d;

    position: absolute;
    top: 24px;
    right: 0;

    cursor: pointer;
`;
