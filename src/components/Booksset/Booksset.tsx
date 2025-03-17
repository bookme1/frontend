import { useRef, useState } from 'react';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import style from './Booksset.module.css';
import { IBook } from '@/app/book/[id]/page.types';
import { addLogEntry } from '@/contexts/Logs/fetchAddLog';
import { openModal, useDispatch } from '@/lib/redux';
import { useGetFilterBooksQuery } from '@/lib/redux/features/book/bookApi';
import { getBooks } from '@/lib/redux/features/book/bookRequests';
import {
    useCreateBookSetMutation,
    useDeleteBookSetMutation,
    useGetBookSetQuery,
} from '@/lib/redux/features/book/booksetApi';
import { BookSetRequest } from '@/lib/redux/features/book/types';

import { GenericModal } from '../GenericModal/GenericModal';
import BookItem from '../book/Item/BookItem';
import { Icon } from '../common/Icon';
import { SwiperList } from '../main/SwiperList';

type TransformedBook = {
    id: string;
    header: {};
    original: {};
    referenceNumber: string;
    art: string;
    title: string;
    url: string;
    price: string;
    pages: number;
    lang: string;
    desc: string;
    author: string;
    pub: string;
    pubDate: string;
    genre: string;
    formatMobi: string;
    formatPdf: string;
    formatEpub: string;
};

const Booksset = ({ userID }: { userID: number }) => {
    const [bookSetData, setBookSetData] = useState<BookSetRequest>({
        id: 0,
        title: '',
        header: {
            createdBy: 1,
            createdAt: '',
        },
        books: [],
    });

    const searchVal = useRef<HTMLInputElement | null>(null);

    const [bookForAdd, setBookForAdd] = useState<TransformedBook[]>([]);
    const [boosetName, setBooksetName] = useState('No name');

    const [query, setQuery] = useState('');
    const [books, setBooks] = useState<IBook[] | undefined>();

    const dispatch = useDispatch();

    const handleModal = () => {
        dispatch(openModal('addBookset'));
    };
    const [
        createBookSet,
        { isLoading, isError: AddError, error, isSuccess: AddSuccess },
    ] = useCreateBookSetMutation();

    if (AddError) {
        addLogEntry({
            source: 'Bookset.tsx useCreateBookSetMutation()',
            message: `'Error creating booksets: ${error}`,
            context: '',
            code: 0,
        });
    }

    const {
        data: booksets,
        isError,
        isSuccess,
        error: getBooksetError,
        refetch,
    } = useGetBookSetQuery();

    if (isError) {
        addLogEntry({
            source: 'Bookset.tsx useGetBookSetQuery()',
            message: `'Error getting booksets: ${getBooksetError}`,
            context: '',
            code: 0,
        });
    }

    const [deleteBookSet] = useDeleteBookSetMutation();

    const searchParams = useSearchParams();
    const q = decodeURIComponent(query || '');
    const authors = decodeURIComponent(searchParams?.get('authors') || '');
    const minPrice = decodeURIComponent(searchParams?.get('minPrice') || '');
    const maxPrice = decodeURIComponent(searchParams?.get('maxPrice') || '');
    const publishers = decodeURIComponent(
        searchParams?.get('publishers') || ''
    );
    const languages = decodeURIComponent(searchParams?.get('languages') || '');
    const genre = decodeURIComponent(searchParams?.get('genre') || '');
    const page = decodeURIComponent(searchParams?.get('page') || '');

    const router = useRouter();

    const {
        data: filterBooks,
        isLoading: getFiltersBooksIsLoading,
        isError: isGetFilterBooksError,
        error: getFilterBooksError,
    } = useGetFilterBooksQuery({
        q,
        authors,
        minPrice,
        maxPrice,
        publishers,
        languages,
        genre,
        page,
    });

    if (isGetFilterBooksError) {
        addLogEntry({
            source: 'Bookset.tsx useGetFilterBooksQuery()',
            message: `'Error getting FilterBooks: ${getFilterBooksError}`,
            context: '',
            code: 0,
        });
    }

    const totalPages = filterBooks ? Math.ceil(filterBooks.quantity / 24) : 1;
    let quantityRange = '';
    if (filterBooks && filterBooks.quantity) {
        const total = filterBooks.quantity;
        const currentPage = Number(page) || 1;
        const itemsPerPage = 24;
        const start = Math.min((currentPage - 1) * itemsPerPage + 1, total);
        const end = Math.min(currentPage * itemsPerPage, total);
        quantityRange = `${start} - ${end} з ${total} Товарів`;
    }
    let newPage = !page ? 1 : page;

    const arrowPageNavigation = (action: string) => {
        if (action === 'plus') {
            newPage = Number(newPage) + 1;
        } else if (action === 'minus') {
            newPage = Number(newPage) - 1;
        }
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('page', newPage.toString());
        router.push(currentUrl.toString());
    };

    const pointsPageNavigation = (action: string) => {
        if (action === 'forward') {
            newPage = Number(newPage) + 2;
        } else if (action === 'back') {
            newPage = Number(newPage) - 2;
        }
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('page', newPage.toString());
        router.push(currentUrl.toString());
    };

    const getPageNumbers = () => {
        const pageNumbers = [];
        const isMobile = window.innerWidth <= 748;

        if (totalPages <= 5 || isMobile) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            let startPage = Number(page) - 2;
            let endPage = Number(page) + 2;

            if (startPage < 1) {
                startPage = 1;
                endPage = 5;
            }

            if (endPage > totalPages) {
                endPage = totalPages;
                startPage = totalPages - 4;
            }

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }

            if (startPage > 1) {
                pageNumbers.unshift('...');
                pageNumbers.unshift(1);
            }

            if (endPage < totalPages) {
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            }
        }

        return pageNumbers;
    };

    const handlePageChange = (newPageTeest: number) => {
        newPage = newPageTeest;
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('page', newPage.toString());
        router.push(currentUrl.toString());
    };

    if (isError) {
        return <p>Произошла ошибка при загрузке данных.</p>;
    }

    if (!isSuccess) {
        return <p>Загрузка...</p>;
    }

    if (booksets && booksets.length === 0) {
        return <p>Нет доступных книжек в каталоге.</p>;
    }

    const handleAddToBooksetList = (bookForList: TransformedBook) => {
        setBookForAdd([...bookForAdd, bookForList]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const transformedBooks = bookForAdd.map(book => ({
                id: book.id, // Используем существующие данные
                header: {}, // Добавьте или настройте значение
                original: {}, // Добавьте или настройте значение
                referenceNumber: '', // Задайте значение
                art: book.art || '', // Или другое свойство
                title: book.title,
                url: book.url,
                price: book.price,
                pages: book.pages,
                lang: book.lang,
                desc: book.desc,
                author: book.author,
                pub: book.pub,
                pubDate: book.pubDate || '', // Или другое значение
                genre: book.genre || '', // Или другое значение
                formatMobi: book.formatMobi || '',
                formatPdf: book.formatPdf || '',
                formatEpub: book.formatEpub || '',
            }));

            await createBookSet({
                id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1,
                title: boosetName,
                header: {
                    createdBy: userID,
                    createdAt: new Date().toISOString(),
                },
                books: transformedBooks, // Преобразованный массив
            }).unwrap();

            // Очистка состояния после создания набора
            setBookSetData({
                id: 0,
                title: '',
                header: {
                    createdBy: userID,
                    createdAt: '',
                },
                books: [],
            });
        } catch (err) {
            console.error('Ошибка при создании набора книг:', err);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBooksetName(event.target.value);
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteBookSet(id).unwrap();
            window.location.reload();
            console.log(`Набор книг с ID ${id} успешно удален.`);
        } catch (err) {
            console.error('Ошибка при удалении набора книг:', err);
        }
    };

    const handleSearch = async (e: any) => {
        try {
            const fetchedBooks = await getBooks({
                selectReferenceAndTitle: true, // get only book referenceNumber & title
            });
            const filteredBooks = fetchedBooks.filter((book: IBook) =>
                book.title.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setBooks(filteredBooks);
        } catch (error) {
            console.error('Error during search:', error);
        }
    };

    const handleSubmitSearch = (e: any) => {
        e.preventDefault();
        if (!searchVal.current) {
            return;
        } else {
            const inputElement = searchVal.current as unknown;
            if (inputElement instanceof HTMLInputElement) {
                setQuery(inputElement.value);
            } else {
                return;
            }
        }
    };

    return (
        <div className={style.container}>
            <button onClick={handleModal} className={style.createBooksetBtn}>
                ADD NEW BOOKSET
            </button>
            {booksets &&
                booksets.map(sets => (
                    <div key={sets.id} className={style.booksetContainer}>
                        <button
                            className={style.createBooksetBtn}
                            onClick={() => handleDelete(sets.id)}
                        >
                            Delete bookset
                        </button>
                        <SwiperList
                            key={sets.id}
                            name={sets.title}
                            bookset={sets.books}
                            id={sets.id}
                            user={null}
                        />
                    </div>
                ))}
            <GenericModal modalName={'addBookset'}>
                <div className={style.form}>
                    <div className={style.header}>
                        <div className={style.SearchContainer}>
                            <input
                                className={style.searchInput}
                                placeholder="Знайти"
                                onChange={e => {
                                    handleSearch(e);
                                }}
                                ref={searchVal}
                            />
                            <button
                                onClick={e => {
                                    handleSubmitSearch(e);
                                }}
                                className={style.searchBtn}
                                type="submit"
                                aria-label="Пошук"
                            >
                                <Icon
                                    name="search"
                                    size={24}
                                    className="icon"
                                />
                            </button>
                        </div>
                        <input
                            className={style.input}
                            type="text"
                            placeholder="Назва набору"
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            className={style.submitBtn}
                            onClick={e => {
                                handleSubmit(e);
                                handleModal();
                            }}
                        >
                            СТВОРИТИ НАБІР
                        </button>
                    </div>
                    <div className={style.booksList}>
                        {filterBooks &&
                            filterBooks.books.map((book, index) => (
                                <BookItem
                                    key={index}
                                    book={book}
                                    isPlusVisible={true}
                                    handleAddToBooksetList={
                                        handleAddToBooksetList
                                    }
                                />
                            ))}
                        {totalPages > 1 && (
                            <div className={style.pagination}>
                                <button
                                    aria-label="Пагінація"
                                    className={style.pagination__button_row}
                                    disabled={Number(page) < 2}
                                    onClick={() => arrowPageNavigation('minus')}
                                >
                                    <Icon name="icon-Alt-Arrow-Left" />
                                </button>
                                {getPageNumbers().map((pageNumber, index) => (
                                    <button
                                        key={index}
                                        className={`${style.pagination__button_page} ${
                                            pageNumber === Number(newPage)
                                                ? style.active
                                                : ''
                                        }`}
                                        onClick={() =>
                                            typeof pageNumber === 'number'
                                                ? handlePageChange(pageNumber)
                                                : pointsPageNavigation(
                                                      index > Number(newPage)
                                                          ? 'forward'
                                                          : 'back'
                                                  )
                                        }
                                    >
                                        {pageNumber}
                                    </button>
                                ))}
                                <button
                                    aria-label="Пагінація"
                                    className={style.pagination__button_row}
                                    disabled={Number(page) > totalPages - 1}
                                    onClick={() => arrowPageNavigation('plus')}
                                >
                                    <Icon name="icon-Alt-Arrow-Right" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </GenericModal>
        </div>
    );
};

export default Booksset;
