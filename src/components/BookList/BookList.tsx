import styles from './BookList.module.css'
import { IBook } from "@/app/book/[id]/page.types";
import BookItem from "../book/Item/BookItem";


const BookList = ({filterBooks, handleOpenModal}:any) => {
  return (
    <ul className={styles.products__list}>
    {filterBooks &&
        filterBooks.books.map(
            (book: IBook) => {
                return (
                    <BookItem
                        key={book.id}
                        book={book}
                        handleOpenModal={
                            handleOpenModal
                        }
                    />
                );
            }
        )}
</ul>
  )
}

export default BookList