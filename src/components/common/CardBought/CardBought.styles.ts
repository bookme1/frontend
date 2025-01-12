'use client';

import { FaHeart } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';

import styled from '@emotion/styled';
import Link from 'next/link';

export const BookFormatContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.15s ease-in-out;
`;

export const CardContainer = styled.li`
    margin: 2px 0;
    width: 230px;
    height: 440px;
    border-radius: 10px;
    list-style: none;
    box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.25);
    position: relative;
    transition: height 0.3s ease;

    &:hover .bookformat {
        opacity: 1;
    }

    .formats-hover {
        overflow: hidden;
        position: absolute;
        bottom: 0; /* Начальная позиция скрытого блока */
        left: 0;
        transform: translateY(105%); /* Скрываем блок за пределами контейнера */
        transition: transform 0.3s ease; /* Плавный переход трансформации */
    }

    .hidden-buttons {
        opacity: 0;
        transition: opacity 0.2s ease-in;
    }
    &:hover {
        .formats-hover {
            transform: translateY(0);
        }
        .hidden-buttons {
            opacity: 1;
            //transition: visibility 0.3s ease-in;
            //transform: translateY(0);
        }
    }
`;

export const HeartFillStyles = styled(FaHeart)`
    width: 24px;
    height: 24px;
    fill: var(--red);
    color: var(--red);
    cursor: pointer;
`;

export const HeartNotFillStyles = styled(FaRegHeart)`
    width: 24px;
    height: 24px;
    cursor: pointer;
`;

export const BoxStyles = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 24px;
`;

export const ImageContainer = styled.div`
    background-image: var(--background-image);
    width: 100%;
    height: 288px;
    background-position: center;
    background-size: cover;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    margin-bottom: 8px;

    &.lazyload {
        background-color: #ccc; /* Цвет фона, который будет виден, пока изображение не загружено */
        background-size: cover;
        background-position: center;
    }
`;

export const DescriptionContainer = styled.div`
    padding: 0px 12px 12px;
`;

export const CardLink = styled(Link)`
    display: block;
    width: 100%;
    height: 100%;
`;

export const Title = styled.p`
    font-size: 18px;
    line-height: 140%;
    font-weight: 700;
    margin-bottom: 12px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 1; /* Ограничивает количество строк до 1 */
`;

export const Authors = styled.p`
    color: var(--gray);
    font-size: 15px;
    line-height: 140%;
    margin-bottom: 8px;
    height: 21px;
    display: block;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const BottomContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const Price = styled.p`
    font-size: 20px;
    font-weight: 700;
    font-variant-numeric: lining-nums proportional-nums;
`;

export const CartButton = styled.button`
    width: 44px;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background-color: var(--red);
`;

export const BookLink = styled.a`
    padding: 3px 6px;
    font-size: 18px;
    font-weight: bold;
    border-radius: 8px;
    border: 1px solid var(--red);
    transition:
        background-color 0.25s ease-in-out,
        color 0.25s ease-in-out;

    &:hover {
        color: white;
        background-color: var(--red);
    }
`;
