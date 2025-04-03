import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import styles from './Header.module.css';
import HeaderAccount from './HeaderAccount/HeaderAccount';
import HeaderBasket from './HeaderBasket/HeaderBasket';
import HeaderFavorites from './HeaderFavorites/HeaderFavorites';
import HeaderModals from './HeaderModals/HeaderModals';
import baseAvatar from '@/assets/main/user.png';

import { closeAllModals, openModal, useDispatch } from '../../../lib/redux';
import { IBookShort } from '../../../lib/redux/features/books/booksSlice';
import { Headerstatistics } from '../../Headerstatistics';
import { SearchList } from '../../main/SearchList';
import { Icon } from '../Icon';

interface AvatarProps {
    children?: React.ReactNode;
}

export const Avatar = ({ children }: AvatarProps) => {
    return (
        <div
            className={styles.avatar}
            style={{ backgroundImage: `url(${baseAvatar.src})` }}
        >
            {children}
        </div>
    );
};

const Header = ({
    booksArr,
}: {
    booksArr: IBookShort[] | undefined | null;
}) => {
    const [isSearchListOpen, setIsSearchListOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const searchVal = useRef<HTMLInputElement | null>(null);
    const [books, setBooks] = useState<IBookShort[] | undefined>();
    const router = useSearchParams();

    const dispatch = useDispatch();

    const handleModalCatalog = () => {
        dispatch(closeAllModals());
        dispatch(openModal('catalog'));
    };

    const handleSearch = async (e: any) => {
        const value = e.target.value;
        setSearchValue(value);
        if (value.length >= 2) {
            setIsSearchListOpen(true);
            const filteredBooks = booksArr?.filter((book: IBookShort) =>
                book.title.toLowerCase().includes(value.toLowerCase())
            );
            setBooks(filteredBooks);
        } else {
            setIsSearchListOpen(false);
        }
    };

    useEffect(() => {
        const q = router?.get('q');
        if (q) {
            if (searchVal.current) {
                searchVal.current.value = q;
            }
        }
    }, [router]); // ???

    const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!searchVal.current) {
            return;
        } else {
            const inputElement = searchVal.current as unknown;
            if (inputElement instanceof HTMLInputElement) {
                window.location.replace(`/books/?q=${inputElement.value}`);
            } else {
                return;
            }
        }
    };

    const handleBurgerButton = () => {
        dispatch(closeAllModals());
        dispatch(openModal('burger'));
    };

    const pathname = usePathname() || '';
    const isAdminka = useMemo(() => pathname.startsWith('/admin'), [pathname]);

    const handleClearSearch = () => {
        setSearchValue(''); // Очистить значение инпута
        setIsSearchListOpen(false); // Закрыть список поиска
        setBooks([]); // Очистить список найденных книг
    };

    return (
        <Suspense fallback={<div>Завантаження...</div>}>
            {isAdminka ? (
                <Headerstatistics />
            ) : (
                <header className={styles.headerContainer}>
                    <div className={`wrapper ${styles.headerWrapper}`}>
                        <div className={styles.subContainer}>
                            <div className={styles.logoContainer}>
                                <Link
                                    href="/"
                                    aria-label="Перейти на головну сторінку"
                                >
                                    <Icon
                                        className={styles.logo}
                                        name="logo_black"
                                        width={176}
                                        height={40}
                                    />
                                </Link>
                            </div>
                        </div>
                        <div className={styles.subBox}>
                            <div className={styles.fromDesktop}>
                                <button
                                    type="submit"
                                    onClick={handleModalCatalog}
                                    className={`z-10 ${styles.catalogBtn}`}
                                >
                                    Категорії
                                </button>
                            </div>
                            <div className={styles.flexRow}>
                                <form
                                    className={styles.searchForm}
                                    onSubmit={e => {
                                        handleSubmitSearch(e);
                                    }}
                                >
                                    <div>
                                        <div style={{ position: 'relative' }}>
                                            <input
                                                className={styles.searchInput}
                                                value={searchValue}
                                                placeholder="Знайти"
                                                onChange={e => {
                                                    handleSearch(e);
                                                }}
                                                ref={searchVal}
                                            />
                                            {isSearchListOpen && (
                                                <div
                                                    onClick={handleClearSearch}
                                                >
                                                    <IoMdClose
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '50%',
                                                            transform:
                                                                'translateY(-50%)',
                                                            left: '8px',
                                                            color: 'red',
                                                            cursor: 'pointer',
                                                            fontWeight: '700',
                                                            fontSize: '32px',
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            className={styles.searchButton}
                                            type="submit"
                                            aria-label="Пошук"
                                        >
                                            <Icon
                                                name="search"
                                                size={24}
                                                className={styles.icon}
                                            />
                                        </button>
                                    </div>
                                    {isSearchListOpen && (
                                        <SearchList
                                            books={books}
                                            isListVisible={() =>
                                                setIsSearchListOpen(false)
                                            }
                                        />
                                    )}
                                </form>
                                <div
                                    style={{ width: 50 }}
                                    className={styles.toTablet}
                                >
                                    <button
                                        className={styles.burgerBtn}
                                        onClick={handleBurgerButton}
                                    >
                                        <Icon name="burger" size={32} />
                                    </button>
                                </div>
                            </div>
                            <div className={styles.fromDesktop}>
                                <div className={styles.controlsContainer}>
                                    <HeaderFavorites />
                                    <HeaderBasket />
                                    <HeaderAccount />
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            )}
            <HeaderModals />
        </Suspense>
    );
};

export default Header;
