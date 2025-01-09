'use client';

import styled from '@emotion/styled';


export const Agreement = styled.p`
    text-align: center;
    color: var(--gray_border);
    margin-bottom: 40px;
`;

export const AgreementLink = styled.a`
    text-decoration: underline;
`;

export const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const RoleCheckbox = styled.input`
    appearance: none;
    width: 20px;
    height: 20px;
    background-color: #fff;

    border: 2px solid #d1d1d1;
    border-radius: 10px;
    position: relative;
    cursor: pointer;

    &:checked {
        border: 2px solid var(--red);
    }

    &:checked::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 12px;
        height: 12px;
        background-color: var(--red);
        border-radius: 50%;
        transform: translate(-50%, -50%);
    }
`;

export const RoleCheckboxLabel = styled.label`
    color: var(--gray_border);
    cursor: pointer;
`;