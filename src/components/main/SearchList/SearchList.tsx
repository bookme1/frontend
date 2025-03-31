'use client';

import styles from './SearchList.module.css';
import { IBookShort } from '@/lib/redux/features/books/booksSlice';

import { SearchItem } from '../SearchItem';

const SearchList = ({
    books,
    isListVisible,
}: {
    books: IBookShort[] | undefined;
    isListVisible: () => void;
}) => {
    if (!books) {
        return <p>Error while fetching books</p>;
    }

    const searchMarkup = books.map(book => (
        <SearchItem
            key={book.id}
            title={book.title}
            id={book.id}
            isListVisible={isListVisible}
        />
    ));
    return (
        <div className={styles.searchListContainer}>
            <ul className={styles.searchListList}>{searchMarkup}</ul>
        </div>
    );
};

export default SearchList;
