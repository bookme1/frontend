'use client';

import Link from 'next/link';

import styles from './SearchItem.module.css';

const SearchItem = ({ title, id, isListVivible }: { title: string; id: string, isListVivible:()=>void}) => {
    const linkHref = `/book/${id}`;
    return (
        <li className={styles.searchItemContainer}>
            <Link className={styles.searchLink} href={linkHref} onClick={()=>isListVivible()}>
                {title}
            </Link>
        </li>
    );
};

export default SearchItem;
