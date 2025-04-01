import React, { ReactNode } from 'react';

import '@/styles/globals.css';

import { Footer } from '../components/common/Footer';
import HeaderWrapper from '../components/common/Header/HeaderWrapper';
import { Icons } from '../components/common/Icons';
import { Providers } from '../lib/providers';
import { raleway } from '../styles/fonts';

interface RootLayoutProps {
    children: ReactNode;
}

const RootLayout = async ({ children }: RootLayoutProps) => {
    return (
        <html className={raleway.className} lang="uk">
            <head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <title>Bookme</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
            </head>
            <body>
                <div className="bg-main">
                    <Providers>
                        <main style={{ height: '100%' }}>
                            <HeaderWrapper />
                            {children}
                            <Footer />
                        </main>

                        <div id="modal-root"></div>
                    </Providers>
                    <Icons />
                </div>
            </body>
        </html>
    );
};

export default RootLayout;
