// components/RootLayout.tsx
'use client';

import React, { ReactNode } from 'react';

import AiButton from '@/components/AiButton/AiButton';
import ModalAiContainerWrapper from '@/components/Modals/ModalAiContainerWrapper/ModalAiContainerWrapper';
import { Icons } from '@/components/common/Icons';
import { UserProvider } from '@/contexts/UserContext';
import { Providers } from '@/lib/providers';
import { raleway } from '@/styles/fonts';
import '@/styles/globals.css';

// components/RootLayout.tsx

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <Providers>
      <UserProvider>
        <html className={raleway.className}>
          <head>
            <link rel="icon" href="/public/favicon.ico" />
          </head>
          <body className="bg-main">
            <main>{children}</main>
            <AiButton />
            <ModalAiContainerWrapper />
            <div id="modal-root"></div>
          </body>
          <Icons />
        </html>
      </UserProvider>
    </Providers>
  );
};

export default RootLayout;
