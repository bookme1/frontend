import { ReactNode } from 'react';

import styles from './BookContent.module.css';

type Props = {
    children: ReactNode;
};

export const BookContent = ({ children }: Props) => {
    return <div className={`wrapper ${styles.contentWrapper}`}>{children}</div>;
};
