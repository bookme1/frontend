'use client';

import styles from './SearchList.module.css';
import { IBook } from '@/app/book/[id]/page.types';

import { SearchItem } from '../SearchItem';

const SearchList = ({
    books,
    isListVivible,
}: {
    books: IBook[] | undefined;
    isListVivible: () => void;
}) => {
    if (!books) {
        return <p>Error while fetching books</p>;
    }

    const searchMarkup = books.map(book => (
        <SearchItem
            key={book.id}
            title={book.title}
            id={book.id}
            isListVivible={isListVivible}
        />
    ));
    return (
        <div className={styles.searchListContainer}>
            <ul className={styles.searchListList}>{searchMarkup}</ul>
        </div>
    );
};

export default SearchList;
