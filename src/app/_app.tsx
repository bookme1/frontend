// pages/_app.tsx
import React, { ReactElement } from 'react';

import { AppProps } from 'next/app';

import RootLayout from './layout';

const MyApp = ({ Component, pageProps }: AppProps): ReactElement => {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
};

export default MyApp;
