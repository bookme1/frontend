import styles from './BookList.module.css';
import { BooksData, IBook } from '@/app/book/[id]/page.types';

import BookItem from '../book/Item/BookItem';

interface BookListProps {
    filterBooks?: BooksData;
    handleOpenModal: (modalName: string, event: React.MouseEvent) => void;
    
}

const BookList: React.FC<BookListProps> = ({
    filterBooks,
  
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
                         
                        />
                    );
                })}
        </ul>
    );
};

export default BookList;
