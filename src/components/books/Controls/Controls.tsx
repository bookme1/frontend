'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import styles from './control.module.css';
import { BooksData, IBook } from '@/app/book/[id]/page.types';
import BookList from '@/components/BookList/BookList';
import { GenericModal } from '@/components/GenericModal/GenericModal';
// import { Loading } from '@/components/SERVICE_PAGES/Loading';
import { Icon } from '@/components/common/Icon';
import { addLogEntry } from '@/contexts/Logs/fetchAddLog';
import { openModal, useDispatch, useSelector } from '@/lib/redux';
import {
    useGetFilterBooksQuery,
    useGetFiltersQuery,
} from '@/lib/redux/features/book/bookApi';
import { FiltersResponse } from '@/lib/redux/features/book/types';
// import { addToOrders } from '@/lib/redux/features/order/orderSlice';
import { IUser } from '@/lib/redux/features/user/types';

import Filter from '../Filter/Filter';

const Loading = dynamic(
    () => import('@/components/SERVICE_PAGES/Loading/Loading'),
    { ssr: false }
);

interface ControlsProps {
    filtersData: FiltersResponse | undefined | null;
    user: IUser | undefined | null;
}

const Controls: React.FC<ControlsProps> = ({ filtersData, user }) => {
    const [selectedSort, setSelectedSort] = useState<string>('Новинки');
    const [isOpenChoice, setIsOpenChoice] = useState(false);
    const isOpenModal = useSelector((state: any) => state.modals.modals.filter);
    const sortArray: string[] = ['Новинки', 'За релевантності'];
    const searchParams = useSearchParams();
    const q = decodeURIComponent(searchParams?.get('q') || '');
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
        isLoading,
        isError,
        error,
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

    const {
        data: filters,
        error: filtersDataError,
        isLoading: filtersDataIsError,
        refetch: fetchFilters,
    } = useGetFiltersQuery('');

    const forFilters = useMemo(() => {
        return {
            authors: authors ? [authors] : [],
            minPrice: minPrice ? parseInt(minPrice) : undefined,
            maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
            publishers: publishers ? [publishers] : [],
            languages: languages ? [languages] : [],
            genres: genre ? [genre] : [],
        };
    }, [authors, minPrice, maxPrice, publishers, languages, genre]);

    const filteredData = getFilteredData(filterBooks?.books);

    const [forFiltersData, setForFiltersData] = useState<
        FilteredData | undefined | null
    >(undefined);

    useEffect(() => {
        const hasDataInFilters = Object.values(forFilters).some(value => {
            return Array.isArray(value) && value.length > 0;
        });

        const newData = !hasDataInFilters ? filters : filteredData;

        // Обновляем состояние только если оно изменилось
        if (JSON.stringify(newData) !== JSON.stringify(forFiltersData)) {
            setForFiltersData(newData);
        }
    }, [filteredData, filters, forFilters, forFiltersData]);

    const updateURL = (updates: { [key: string]: string | undefined }) => {
        if (searchParams) {
            const current = new URLSearchParams(
                Array.from(searchParams.entries())
            );
            current.set('page', '1');
            Object.entries(updates).forEach(([key, value]) => {
                if (value !== null && value !== undefined && value !== '') {
                    current.set(key, value);
                } else {
                    current.delete(key);
                }
            });
            const search = current.toString();
            const query = search ? `?${search}` : '';
            router.push(`${window.location.pathname}${query}`);
        }
    };

    if (isError) {
        addLogEntry({
            source: 'Controls.tsx useGetFilterBooksQuery',
            message: `'Error filtering books: ${error}`,
            context: '',
            code: 0,
        });
    }

    const dispatch = useDispatch();

    const handleOpenModal = (modalName: string, event: React.MouseEvent) => {
        event.preventDefault();
        dispatch(openModal(modalName));
    };

    const handleSortClick = (sortText: string) => {
        setSelectedSort(sortText);
        setIsOpenChoice(false);
    };

    const loader = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleResize = () => {
            // Your resize logic here
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const loadMoreItems = () => {
            // Your load more items logic here
        };

        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    loadMoreItems();
                }
            },
            {
                root: null,
                rootMargin: '20px',
                threshold: 1.0,
            }
        );

        const currentLoader = loader.current;

        if (currentLoader) {
            observer.observe(currentLoader);
        }

        return () => {
            if (currentLoader) {
                observer.unobserve(currentLoader);
            }
        };
    }, []); // Removed loader.current from dependency array

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
        router.replace(currentUrl.toString());
    };

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth <= 748);
    }, []);

    const getPageNumbers = () => {
        const pageNumbers = [];

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

        if (Number(page) !== newPage) {
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set('page', newPage.toString());
            router.replace(currentUrl.toString());
        }
    };

    return (
        <>
            {isLoading && filterBooks ? (
                <Loading />
            ) : (
                <section className={styles.section}>
                    {isOpenModal.isOpen && (
                        <GenericModal
                            modalName="filter"
                            align={window.innerWidth <= 748 ? 'center' : 'left'}
                        >
                            <div
                                className={`${styles.filter} ${styles.mobile}`}
                            >
                                <Filter
                                    filtersData={forFiltersData}
                                    updateURL={updateURL}
                                />
                            </div>
                        </GenericModal>
                    )}
                    <div className={styles.container}>
                        <div className={styles.wrapper}>
                            {!isMobile && filtersData && (
                                <div className={styles.computer__filter}>
                                    <Filter
                                        filtersData={forFiltersData}
                                        updateURL={updateURL}
                                    />
                                </div>
                            )}

                            <div className={styles.products__section}>
                                <div className={styles.information}>
                                    <div
                                        className={styles.information__buttons}
                                    >
                                        <button
                                            className={styles.button__filter}
                                            onClick={e =>
                                                handleOpenModal('filter', e)
                                            }
                                        >
                                            <Icon
                                                size={24}
                                                name="icon-filter"
                                            />
                                            Фільтр{' '}
                                            <Icon size={12} name="icon-close" />
                                        </button>
                                        <div>
                                            <button
                                                className={`${styles.button__sort} ${isOpenChoice && styles.open}`}
                                                onClick={() =>
                                                    setIsOpenChoice(
                                                        !isOpenChoice
                                                    )
                                                }
                                            >
                                                <Icon name="icon-choice" />
                                                {selectedSort}
                                            </button>
                                            {isOpenChoice && (
                                                <ul>
                                                    {sortArray.map(
                                                        (text, index) => (
                                                            <li key={index}>
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleSortClick(
                                                                            text
                                                                        )
                                                                    }
                                                                >
                                                                    {text}
                                                                </button>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            )}
                                        </div>
                                    </div>

                                    <ul className={styles.information__list}>
                                        {sortArray.map((text, index) => {
                                            return (
                                                <li key={index}>
                                                    <button
                                                        onClick={() =>
                                                            handleSortClick(
                                                                text
                                                            )
                                                        }
                                                        className={
                                                            text ===
                                                            selectedSort
                                                                ? styles.open
                                                                : undefined
                                                        }
                                                    >
                                                        {text}
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                    <p className={styles.information__quantity}>
                                        {quantityRange}
                                    </p>
                                </div>
                                {isLoading ? (
                                    <div
                                        style={{
                                            fontSize: '36px',
                                            width: '100%',
                                            marginLeft: 'auto',
                                            height: '950px',
                                        }}
                                    >
                                        loading...
                                    </div>
                                ) : (
                                    <BookList
                                        filterBooks={filterBooks}
                                        user={user}
                                        handleOpenModal={handleOpenModal}
                                        genre={genre}
                                        updateURL={updateURL}
                                    />
                                )}
                                {totalPages > 1 && (
                                    <div className={styles.pagination}>
                                        <button
                                            aria-label="Пагінація"
                                            className={
                                                styles.pagination__button_row
                                            }
                                            disabled={Number(page) < 2}
                                            onClick={() =>
                                                arrowPageNavigation('minus')
                                            }
                                        >
                                            <Icon name="icon-Alt-Arrow-Left" />
                                        </button>
                                        {getPageNumbers().map(
                                            (pageNumber, index) => (
                                                <button
                                                    key={index}
                                                    className={`${styles.pagination__button_page} ${
                                                        pageNumber ===
                                                        Number(newPage)
                                                            ? styles.active
                                                            : ''
                                                    }`}
                                                    onClick={() =>
                                                        typeof pageNumber ===
                                                        'number'
                                                            ? handlePageChange(
                                                                  pageNumber
                                                              )
                                                            : pointsPageNavigation(
                                                                  index >
                                                                      Number(
                                                                          newPage
                                                                      )
                                                                      ? 'forward'
                                                                      : 'back'
                                                              )
                                                    }
                                                >
                                                    {pageNumber}
                                                </button>
                                            )
                                        )}
                                        <button
                                            aria-label="Пагінація"
                                            className={
                                                styles.pagination__button_row
                                            }
                                            disabled={
                                                Number(page) > totalPages - 1
                                            }
                                            onClick={() =>
                                                arrowPageNavigation('plus')
                                            }
                                        >
                                            <Icon name="icon-Alt-Arrow-Right" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default Controls;

interface FilteredData {
    authors: string[];
    genres: string[];
    languages: string[];
    minPrice: number;
    maxPrice: number;
    publishers: string[];
}

const getFilteredData = (filterBooks: IBook[] | undefined): FilteredData => {
    const authors = Array.from(new Set(filterBooks?.map(book => book.author)));
    const genres = Array.from(
        new Set(filterBooks?.map(book => book.genre))
    ).filter((genre): genre is string => genre !== undefined);
    const languages = Array.from(new Set(filterBooks?.map(book => book.lang)));
    const publishers = Array.from(new Set(filterBooks?.map(book => book.pub)));
    const prices = filterBooks
        ?.map(book => book.price)
        .filter(price => price !== undefined);

    return {
        authors,
        genres,
        languages,
        minPrice: prices?.length ? Math.min(...prices) : 0,
        maxPrice: prices?.length ? Math.max(...prices) : 0,
        publishers,
    };
};

///// ЭТО РАБОЧАЯ УНИВЕРСАЛЬНАЯ ФУНКЙИЯ ДЛЯ ФИТРАЦИИ ИЗМЕНЕНИЯ ДОСТУПНЫХ ПАРАМЕТРОВ ФИЛЬТРАЦИИ
// const getFilteredData = (
//     filterBooks: BooksData | undefined,
//     filters: {
//         authors?: string[];
//         genres?: string[];
//         languages?: string[];
//         minPrice?: number;
//         maxPrice?: number;
//         publishers?: string[];
//     }
// ): FilteredData => {
//     const filteredBooks =
//         filterBooks?.books.filter(book => {
//             return (
//                 (!filters.authors?.length ||
//                     filters.authors.includes(book.author)) &&
//                 (!filters.genres?.length ||
//                     filters.genres.some(genre =>
//                         book.genre
//                             ?.split('/')
//                             .map(g => g.trim())
//                             .includes(genre)
//                     )) &&
//                 (!filters.languages?.length ||
//                     filters.languages.includes(book.lang)) &&
//                 (!filters.publishers?.length ||
//                     filters.publishers.includes(book.pub)) &&
//                 (filters.minPrice === undefined ||
//                     book.price >= filters.minPrice) &&
//                 (filters.maxPrice === undefined ||
//                     book.price <= filters.maxPrice)
//             );
//         }) || [];

//     const prices = filteredBooks.map(book => {
//         const price = Number(book.price);
//         return !isNaN(price) ? price : 0;
//     });
//     if (prices.length === 0) {
//         return {
//             authors: [],
//             genres: [],
//             languages: [],
//             publishers: [],
//             minPrice: 0,
//             maxPrice: 0,
//         };
//     }

//     const minPrice = Math.min(...prices);
//     const maxPrice = Math.max(...prices);
//     return {
//         authors: Array.from(
//             new Set(filteredBooks.map(book => book.author).filter(Boolean))
//         ) as string[],
//         genres: Array.from(
//             new Set(filteredBooks.map(book => book.genre).filter(Boolean))
//         ) as string[],
//         languages: Array.from(
//             new Set(filteredBooks.map(book => book.lang).filter(Boolean))
//         ) as string[],
//         publishers: Array.from(
//             new Set(filteredBooks.map(book => book.pub).filter(Boolean))
//         ) as string[],
//         minPrice,
//         maxPrice,
//     };
// };
