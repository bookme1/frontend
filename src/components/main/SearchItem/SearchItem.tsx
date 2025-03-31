'use client';

import Link from 'next/link';

import styles from './SearchItem.module.css';

const SearchItem = ({
    title,
    id,
    isListVisible,
}: {
    title: string;
    id: string;
    isListVisible: () => void;
}) => {
    const linkHref = `/book/${id}`;
    return (
        <li className={styles.searchItemContainer}>
            <Link
                className={styles.searchLink}
                href={linkHref}
                onClick={() => isListVisible()}
            >
                {title}
            </Link>
        </li>
    );
};

export default SearchItem;
