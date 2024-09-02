'use client';

import React, { ReactNode } from 'react';

import 'swiper/css';
import 'swiper/swiper-bundle.css';

import AiButton from '@/components/AiButton/AiButton';
import ModalAiContainerWrapper from '@/components/Modals/ModalAiContainerWrapper/ModalAiContainerWrapper';
import { Icons } from '@/components/common/Icons';
import { Providers } from '@/lib/providers';
import { raleway } from '@/styles/fonts';
import '@/styles/globals.css';

interface RootLayoutProps {
    children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
    return (
        <Providers>
            <html className={raleway.className}>
                <head>
                    <meta charSet="UTF-8" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0"
                    />
                    <title>Bookme</title>
                    <link rel="icon" href="/favicon.ico" />
                </head>
                <body className="bg-main">
                    <main>{children}</main>
                    <AiButton />
                    <ModalAiContainerWrapper />
                    <div id="modal-root"></div>
                </body>
                <Icons />
            </html>
        </Providers>
    );
};

export default RootLayout;
