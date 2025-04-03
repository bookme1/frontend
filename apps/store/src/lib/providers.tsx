'use client';

/* Core */
import { Provider } from 'react-redux';

/* Instruments */
import { reduxStore } from './redux';

export const Providers = ({ children }: React.PropsWithChildren<{}>) => {
    return <Provider store={reduxStore}>{children}</Provider>;
};
