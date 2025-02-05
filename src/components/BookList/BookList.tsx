import styles from './BookList.module.css';
import { BooksData, IBook } from '@/app/book/[id]/page.types';
import { IUser } from '@/lib/redux/features/user/types';

import BookItem from '../book/Item/BookItem';

interface BookListProps {
    filterBooks?: BooksData;
    handleOpenModal: (modalName: string, event: React.MouseEvent) => void;
    user: IUser | undefined | null;
}

const BookList: React.FC<BookListProps> = ({
    filterBooks,
    user,
    handleOpenModal,
}) => {
    return (
        <ul className={styles.products__list}>
            {filterBooks &&
                filterBooks.books.map((book: IBook) => {
                    return (
                        <BookItem
                            key={book.id}
                            book={book}
                            handleOpenModal={handleOpenModal}
                            user={user}
                        />
                    );
                })}
        </ul>
    );
};

export default BookList;
