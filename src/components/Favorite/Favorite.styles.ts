'use client';

import { keyframes } from '@emotion/react';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';

import styled from '@emotion/styled';

export const FavList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: flex-start;
    max-height: 1600px;
    overflow-y: auto;
width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
`;

export const Text = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const fillHeart = keyframes`
    0% {
        color: transparent;
    }

    100% {
        color: var(--red);
    }
`;

export const FilledHeart = styled(IoMdHeart)`
    position: absolute;
    top: 4px;
    left: 4px;
    width: 24px;
    height: 24px;

    z-index: 1;

    &.active {
        animation: ${fillHeart} 0.4s ease forwards;
    }
`;

export const EmptyHeart = styled(IoMdHeartEmpty)`
    position: absolute;
    top: 4px;
    left: 4px;
    width: 24px;
    height: 24px;

    z-index: 2;
    color: var(--red);
`;
