'use client';

import styles from './SearchList.module.css';

import { IBook } from '@/app/book/[id]/page.types';

import { SearchItem } from '../SearchItem';

const SearchList = ({ books }: { books: IBook[] | undefined }) => {
    if (!books) {
        return <p>Error while fetching books</p>;
    }

    const searchMarkup = books.map(book => (
        <SearchItem key={book.title} title={book.title} id={book.id} />
    ));
    return (
        <div className={styles.searchListContainer}>
            <ul className={styles.searchListList}>{searchMarkup}</ul>
        </div>
    );
};

export default SearchList;
