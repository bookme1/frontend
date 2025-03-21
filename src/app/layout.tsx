import React, { ReactNode } from 'react';

import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';
import { Icons } from '@/components/common/Icons';

import { fetchUserData } from '@/contexts/fetchUserData';
import { Providers } from '@/lib/providers';
import { raleway } from '@/styles/fonts';
import '@/styles/globals.css';
import { fetchBooks } from '@/contexts/fetchBooks';

interface RootLayoutProps {
    children: ReactNode;
}

const RootLayout = async ({ children }: RootLayoutProps) => {
    const user = await fetchUserData();
    const booksArr = await fetchBooks()

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
            <body className="bg-main">
                <Providers>
                    <main style={{ height: '100%' }}>
                        <Header
                            userData={user}
                            booksArr={booksArr}
                        />
                        {children}
                        <Footer />
                    </main>


                    <div id="modal-root"></div>
                </Providers>
                <Icons />
            </body>
        </html>
    );
};

export default RootLayout;
