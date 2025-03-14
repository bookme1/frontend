'use client';

import Link from 'next/link';

import styles from './SearchItem.module.css';

const SearchItem = ({ title, id }: { title: string; id: string }) => {
    const linkHref = `/book/${id}`;
    return (
        <li className={styles.searchItemContainer}>
            <Link className={styles.searchLink} href={linkHref}>
                {title}
            </Link>
        </li>
    );
};

export default SearchItem;
