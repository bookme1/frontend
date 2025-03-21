import styles from './BookList.module.css';
import { BooksData, IBook } from '@/app/book/[id]/page.types';
import { IUser } from '@/lib/redux/features/user/types';

import BookItem from '../book/Item/BookItem';

interface BookListProps {
    filterBooks?: BooksData;
    handleOpenModal: (modalName: string, event: React.MouseEvent) => void;
    user: IUser | undefined | null;
    genre: string;
    updateURL: (updates: { [key: string]: string | undefined }) => void;

}

const BookList: React.FC<BookListProps> = ({
    filterBooks,
    user,
    handleOpenModal,
    genre,
    updateURL,

}) => {
    const handleClearGenreFilter = () => {
        updateURL({
            genre: '',
        });
    };
    return (
        <>
            <div className={styles.miniFiltersContainer}>
                {genre && (
                    <div className={styles.miniFilter}>
                        {genre}
                        <button
                            className={styles.clearFilterBtn}
                            onClick={handleClearGenreFilter}
                        >
                            x
                        </button>
                    </div>
                )}
            </div>
            <ul className={styles.products__list}>
                {filterBooks &&
                    filterBooks.books.map((book: IBook) => {
                        return (
                            <BookItem
                                key={book.id}
                                book={book}
                                handleOpenModal={handleOpenModal}
                                user={user}
                                isSwiper={false}
                             
                            />
                        );
                    })}
            </ul>
        </>
    );
};

export default BookList;
