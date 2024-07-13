'use client';

import React from 'react';
import { RiAdminFill } from 'react-icons/ri';

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
                        <RiAdminFill size={40} color="#f33" />
                        <Icon name="exit" className="mr-2" />
                    </div>
                </LogoContainer>
            </div>
        </>
    );
};

export default Headerstatistics;
