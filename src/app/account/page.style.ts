'use client';

import styled from '@emotion/styled';

export const WrapperStyle = styled.div`
    width: 343px;
    margin: 10px 16px;
    @media (min-width: 768px) {
        /* width: 728px; */
        width: 25%;

        border-radius: 15px;
        background-color: whitesmoke;
        padding: 10px;
    }

    @media (min-width: 1280px) {
        width: 20%;
        margin-left: 10%;
    }
`;

export const UserDiv = styled.div`
    margin-top: 100px;
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 12px;
    display: flex;
    justify-content: center;
`;

export const UserList = styled.ul`
    min-width: 270px;
`;

export const UserImg = styled.img`
    border: 2px solid black;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background-color: orange;
`;

export const UserName = styled.p``;

export const NavDiv = styled.div`
    margin-top: 48px;
    display: flex;
    justify-content: flex-start;
    width: 1240px;
`;

export const Navli = styled.li`
    margin-bottom: 40px;
    list-style-type: none;
    padding: 10px;
    background-color: transparent;
    border: none;
    border-radius: 8px;
    cursor: pointer;
`;

export const SpanStyle = styled.span`
    transition:
        color 0.3s ease,
        background-color 0.3s ease;
    display: flex;
    gap: 10px;
    align-items: center;

    &:hover {
        color: var(--red);
    }
`;

export const ExitDiv = styled.div`
    margin-top: 200px;
    display: flex;
    justify-content: center;
`;

export const AccountContainer = styled.div`
    margin-top: 32px;
    display: flex;
    gap: 16px;
    /* float: left; */
`;
