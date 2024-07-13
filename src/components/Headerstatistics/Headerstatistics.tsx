'use client';

import React from 'react';
import { FaUserTie } from 'react-icons/fa';

import Link from 'next/link';

import { LogoContainer } from './Headerstatistics.style';

import { Logo } from '../common/Header/Header.styles';
import { Icon } from '../common/Icon';

const Headerstatistics = ({ username }: { username: string | null }) => {
    return (
        <>
            <div>
                <LogoContainer className="flex items-center shadow-xl h-20">
                    <Link href="/" className="ml-20">
                        <Logo name="logo_black" />
                    </Link>
                    <div className="flex items-center gap-10">
                        <p>{username}</p>
                        <FaUserTie size={40} color="#000" />
                        <Icon name="exit" className="mr-2" />
                    </div>
                </LogoContainer>
            </div>
        </>
    );
};

export default Headerstatistics;
