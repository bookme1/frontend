'use client';

import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import ContentLoader from 'react-content-loader';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import styles from './Header.module.css';
import { IBook } from '@/app/book/[id]/page.types';
import baseAvatar from '@/assets/main/user.png';
import { Headerstatistics } from '@/components/Headerstatistics';
import { Modal } from '@/components/main/Modal';
import { SearchList } from '@/components/main/SearchList';
import {
    selectOpenModal,
    setModalContent,
    setModalStatus,
    useDispatch,
    useSelector,
} from '@/lib/redux';
import {
    useGetCartQuantityQuery,
    useGetCartQuery,
} from '@/lib/redux/features/book/bookApi';
import { getBooks } from '@/lib/redux/features/book/bookRequests';
import { addOrderedBooks } from '@/lib/redux/features/order/orderSlice';
import { BookType, IUser, Role } from '@/lib/redux/features/user/types';
import { addUserData } from '@/lib/redux/features/user/userSlice';

import { Icon } from '../Icon';

const IoMdHeartEmpty = dynamic(
    () => import('react-icons/io').then(mod => mod.IoMdHeartEmpty),
    { ssr: false }
);

const TfiPanel = dynamic(
    () => import('react-icons/tfi').then(mod => mod.TfiPanel),
    { ssr: false }
);

interface HeartIconProps {
    hasFavorites: boolean | null;
    favQuantity: number | null | undefined;
}

interface BasketIconProps {
    cartQuantity: number | null | undefined;
}

export const HeartIcon = ({ hasFavorites, favQuantity }: HeartIconProps) => {
    return (
        <div
            className={`${styles.heartIcon} ${hasFavorites ? styles.favorited : styles.notFavorited}`}
        >
            <IoMdHeartEmpty size={28} />
            {hasFavorites && (
                <div className={styles.favoriteCount}>{favQuantity}</div>
            )}
        </div>
    );
};

export const BasketIcon = ({ cartQuantity }: BasketIconProps) => {
    return (
        <div
            className={`${styles.heartIcon} ${cartQuantity ? styles.favorited : styles.notFavorited}`}
        >
            <Icon name="cart" size={28} />
            {cartQuantity && (
                <div className={styles.favoriteCount}>{cartQuantity}</div>
            )}
        </div>
    );
};

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
    userData,
    favQuantity,
    booksArr,
}: {
    userData: IUser | null;
    favQuantity: number | null;
    booksArr: IBook[] | undefined | null;
}) => {
    const isLoading = false;
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);
    const [isCatalogOpen, setIsCatalogOpen] = useState(false);
    const [isSearchListOpen, setIsSearchListOpen] = useState(false);
    const searchVal = useRef<HTMLInputElement | null>(null);
    const [books, setBooks] = useState<IBook[] | undefined>();
    const router = useSearchParams();

    const { data: cartQuantity, refetch: refetchCartQuantity } =
        useGetCartQuantityQuery({
            type: BookType.Cart,
        });
    const { data: carts, refetch: refetchCart } = useGetCartQuery({
        type: BookType.Cart,
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (carts) {
            dispatch(addOrderedBooks(carts.data));
        }
    }, [carts, dispatch]);

    useEffect(() => {
        if (userData) {
            dispatch(addUserData(userData));
        }
    }, [dispatch, userData]);

    const modalOpen = useSelector(selectOpenModal);

    const handleModal = () => {
        dispatch(setModalStatus(!modalOpen));
        dispatch(setModalContent('Catalog'));
    };

    const handleCartModal = () => {
        dispatch(setModalStatus(!modalOpen));
        dispatch(setModalContent('Cart'));
        refetchCartQuantity();
        refetchCart();
    };

    const handleClick = () => {
        setIsOpen(true);
    };

    const handleSearch = async (e: any) => {
        if (e.target.value.length >= 2) {
            setIsSearchListOpen(true);
            // try {
            //     const fetchedBooks = await getBooks({
            //         selectReferenceAndTitle: true, // get only book referenceNumber & title
            //     });
            //     const filteredBooks = fetchedBooks.filter((book: IBook) =>
            //         book.title
            //             .toLowerCase()
            //             .includes(e.target.value.toLowerCase())
            //     );
            //     setBooks(filteredBooks);
            // } catch (error) {
            //     console.error('Error during search:', error);
            // }
            const filteredBooks = booksArr?.filter((book: IBook) =>
                book.title.toLowerCase().includes(e.target.value.toLowerCase())
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
    }, [router]);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
    }, [isOpen]);

    useEffect(() => {
        if (isCatalogOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
    }, [isCatalogOpen]);

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

    const hasFavorites = !!favQuantity;

    const handleBurgerButton = () => {
        dispatch(setModalContent('Burger'));
        dispatch(setModalStatus(!modalOpen));
    };

    const pathname = usePathname();
    const isAdminka = useMemo(() => pathname.startsWith('/admin'), [pathname]);

    return (
        <>
            {isAdminka ? (
                <Headerstatistics username={userData?.username} />
            ) : (
                <header className={styles.headerContainer}>
                    <div className={`wrapper ${styles.headerWrapper}`}>
                        <div className={styles.logocantainer}>
                            <Link
                                href="/"
                                aria-label="Перейти на головну сторінку"
                            >
                                <Icon
                                    className={styles.logo}
                                    name="logo_black"
                                />
                            </Link>
                        </div>
                        <div className={styles.fromDesctop}>
                            <button
                                type="submit"
                                onClick={handleModal}
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
                                    <input
                                        className={styles.searchInput}
                                        placeholder="Знайти"
                                        onChange={e => {
                                            handleSearch(e);
                                        }}
                                        ref={searchVal}
                                    />
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
                                    <SearchList books={books} />
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
                        <div className={styles.fromDesctop}>
                            <div className={styles.controlsContainer}>
                                <div className={styles.heartBtn}>
                                    <a
                                        className={styles.accountLink}
                                        href={
                                            userData
                                                ? '/account/favorites'
                                                : '/favorite'
                                        }
                                    >
                                        <HeartIcon
                                            hasFavorites={hasFavorites}
                                            favQuantity={favQuantity}
                                        />
                                        Обране
                                    </a>
                                </div>
                                <button
                                    className={styles.headerBtn}
                                    onClick={handleCartModal}
                                >
                                    <BasketIcon cartQuantity={cartQuantity} />
                                    Кошик
                                </button>
                                {isLoading ? (
                                    <ContentLoader
                                        speed={2}
                                        width={50}
                                        height={50}
                                        viewBox="0 0 50 50"
                                        backgroundColor="#f3f3f3"
                                        foregroundColor="#ecebeb"
                                    >
                                        <rect
                                            x="0"
                                            y="35"
                                            rx="3"
                                            ry="3"
                                            width="50"
                                            height="15"
                                        />
                                        <circle cx="25" cy="16" r="16" />
                                    </ContentLoader>
                                ) : userData ? (
                                    <Avatar>
                                        <a
                                            className={styles.accountLink}
                                            href="/account"
                                        ></a>
                                    </Avatar>
                                ) : (
                                    <button
                                        className={styles.headerBtn}
                                        onClick={() => {
                                            handleClick();
                                        }}
                                    >
                                        <Icon name="account" size={28} />
                                        Увійти
                                    </button>
                                )}
                                {(userData?.role === Role.Moderator ||
                                    userData?.role === Role.Admin) && (
                                    <a href="/admin">
                                        <TfiPanel size={40} color="#000" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </header>
            )}
            {isOpen && <Modal setIsOpen={setIsOpen} />}
        </>
    );
};

export default Header;
