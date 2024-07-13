'use client';

/* Core */
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';

/* Instruments */
import { reduxStore } from '@/lib/redux';

export const Providers = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <SessionProvider>
      <Provider store={reduxStore}>{children}</Provider>
    </SessionProvider>
  );
};
