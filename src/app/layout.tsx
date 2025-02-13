import React, { ReactNode } from 'react';

import ModalAiContainerWrapper from '@/components/Modals/ModalAiContainerWrapper/ModalAiContainerWrapper';
import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';
import { Icons } from '@/components/common/Icons';
import { fetchGetCartssQuantity } from '@/contexts/fetchGetCartsQuantity';
import { fetchGetFavoritesQuantity } from '@/contexts/fetchGetFavoritesQuantity';
import { fetchGetOrders } from '@/contexts/fetchGetOrders';
import { fetchUserData } from '@/contexts/fetchUserData';
import { Providers } from '@/lib/providers';
import { BookType } from '@/lib/redux/features/user/types';
import { raleway } from '@/styles/fonts';
import '@/styles/globals.css';

interface RootLayoutProps {
    children: ReactNode;
}

const RootLayout = async ({ children }: RootLayoutProps) => {
    const user = await fetchUserData();
    const favQuantity = await fetchGetFavoritesQuantity(BookType.Fav);
    const cartQuantity = await fetchGetCartssQuantity(BookType.Cart);
    const carts = await fetchGetOrders(BookType.Cart);
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
                            favQuantity={favQuantity}
                            cartQuantity={cartQuantity}
                            carts={carts}
                        />
                        {children}
                        <Footer />
                    </main>

                    <ModalAiContainerWrapper />
                    <div id="modal-root"></div>
                </Providers>
                <Icons />
            </body>
        </html>
    );
};

export default RootLayout;
