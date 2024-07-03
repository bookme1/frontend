"use client";
import { Wrapper } from "@/styles/globals.styles";
import styled from "@emotion/styled";

const Container = styled(Wrapper)`
    display: flex;
    justify-content: center;
    @media (min-width: 748px) {
    }
    @media (min-width: 1234px) {
    }
`;

const TopSection = styled.div`
    background-color: var(--beige);
    padding: 40px 0px 64px 0px;
    @media (min-width: 748px) {
        padding: 32px 0px;
    }
    @media (min-width: 1234px) {
        padding: 32px 0px 24px 0px;
    }
    & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 32px;
        @media (min-width: 748px) {
            flex-direction: row;
            align-items: start;
        }
        @media (min-width: 1234px) {
            gap: 92px;
        }
        & > .links {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            @media (min-width: 748px) {
                gap: 24px;
                max-width: 217px;
            }
            @media (min-width: 1234px) {
                gap: 32px;
            }
            & > a > svg {
                @media (min-width: 748px) {
                    width: 217px !important;
                    height: 40px !important;
                }
            }
            & > div {
                display: none;
                gap: 23px;
                @media (min-width: 748px) {
                    display: flex;
                }
                & > a {
                    padding: 10px;
                    background-color: #ff3333;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                    &:hover {
                        transform: scale(1.1);
                    }
                }
            }
        }
        & > .navigation {
            width: 100%;
            & > h3 {
                font-family: "Raleway", sans-serif;
                font-weight: 700;
                font-size: 28px;
                line-height: 1.2;
                letter-spacing: -0.02em;
                margin-bottom: 16px;
                display: none;
                @media (min-width: 748px) {
                    display: block;
                }
                @media (min-width: 1234px) {
                    margin-bottom: 32px;
                }
            }
            & > div {
                display: flex;
                gap: 24px;
                flex-direction: column;
                @media (min-width: 748px) {
                    gap: 22px;
                    flex-direction: row;
                }
                @media (min-width: 1234px) {
                    gap: 221px;
                }
                & > ul {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                    &:nth-of-type(1) {
                        color: #ff3333;
                        & > li {
                            &:nth-of-type(3) {
                                color: var(--text_main);
                            }
                            &:not(:nth-of-type(3)) {
                                a > svg {
                                    display: none;
                                }
                            }
                        }
                    }
                    @media (min-width: 748px) {
                        width: 230px;
                    }
                    @media (min-width: 1234px) {
                        width: 240px;
                    }
                    & > li {
                        & > a {
                            display: flex;
                            justify-content: space-between;
                            transition: all 0.3s ease;
                            &:hover {
                                transform: scale(1.1);
                                color: #ff3333;
                            }
                        }
                    }
                }
            }
        }
        & > .mobile__navigation {
            display: flex;
            gap: 23px;
            @media (min-width: 748px) {
                display: none;
            }
            & > a {
                padding: 10px;
                background-color: #ff3333;
                border-radius: 50%;
            }
        }
    }
`;

const BottomSection = styled.div`
    background-color: var(--bottom);
    padding: 24px 0;
    @media (min-width: 748px) {
        padding: 8px 0;
    }
    @media (min-width: 1234px) {
        padding: 16px 0;
    }
    & > div > ul {
        display: flex;
        gap: 16px;
        @media (min-width: 748px) {
            gap: 40px;
        }
        @media (min-width: 1234px) {
            gap: 204px;
        }
        & > li {
            font-family: "Raleway", sans-serif;
            font-weight: 500;
            font-size: 16px;
            color: var(--white);
        }
    }
`;

export { Container, TopSection, BottomSection };
