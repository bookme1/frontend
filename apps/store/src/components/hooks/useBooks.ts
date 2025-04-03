import { useEffect } from 'react';

import { IBook } from '../../app/book/[id]/page.types';
import { useDispatch, useSelector } from '../../lib/redux';
import { setBooks } from '../../lib/redux/features/books/booksSlice';

const MS_IN_24_HOURS = 24 * 60 * 60 * 1000;

export const useBooks = () => {
    const dispatch = useDispatch();
    const books = useSelector(state => state.book.books);
    const lastFetchedAt = useSelector(state => state.book.lastFetchedAt);

    useEffect(() => {
        const shouldFetch =
            !lastFetchedAt || Date.now() - lastFetchedAt > MS_IN_24_HOURS;

        if (shouldFetch) {
            fetch(
                `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/api/book?isShort=true`
            )
                .then(res => res.json())
                .then((data: IBook[]) => dispatch(setBooks(data)))
                .catch(console.error);
        }
    }, [dispatch, lastFetchedAt]);

    return books;
};
