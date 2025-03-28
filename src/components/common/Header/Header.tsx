'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import ContentLoader from 'react-content-loader';

import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import styles from './Header.module.css';
import { IBook } from '@/app/book/[id]/page.types';
import baseAvatar from '@/assets/main/user.png';
import { GenericModal } from '@/components/GenericModal/GenericModal';
import { Headerstatistics } from '@/components/Headerstatistics';
import Burger from '@/components/main/BurgerModal/Burger';
import Menu from '@/components/main/DesktopCatalog/Menu';
import Basket from '@/components/main/Modal/Basket/Basket';
import SignIn from '@/components/main/Modal/SignIn/SignIn';
import SignUp from '@/components/main/Modal/SignUp/SignUp';
import { SearchList } from '@/components/main/SearchList';
import { addLogEntry } from '@/contexts/Logs/fetchAddLog';
import { closeAllModals, openModal, useDispatch } from '@/lib/redux';
import {
    useGetCartQuery,
    useGetFavoritesQuery,
} from '@/lib/redux/features/book/bookApi';
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
    booksArr,
}: {
    userData: IUser | null;
    booksArr: IBook[] | undefined | null;
}) => {
    const isLoading = false;
    const [isSearchListOpen, setIsSearchListOpen] = useState(false);
    const searchVal = useRef<HTMLInputElement | null>(null);
    const [books, setBooks] = useState<IBook[] | undefined>();
    const router = useSearchParams();

    const dispatch = useDispatch();

    const {
        data: carts,
        refetch: refetchCart,
        isLoading: isGetCartQueryLoading,
        isError: isGetCartQuery,
        error: getCartQueryError,
    } = useGetCartQuery({
        type: BookType.Cart,
    });

    const {
        data: favs,
        refetch: refetchFav,
        isLoading: isGetFavQueryLoading,
        isError: isGetFavQuery,
        error: getFavQueryError,
    } = useGetFavoritesQuery({
        type: BookType.Fav,
    });

    if (userData && getCartQueryError) {
        let mess = '';

        if ((getCartQueryError as FetchBaseQueryError).status) {
            const error = getCartQueryError as FetchBaseQueryError;

            if (
                'data' in error &&
                typeof error.data === 'object' &&
                error.data !== null &&
                'message' in error.data
            ) {
                mess = (error.data as { message: string }).message;
            }

            const errorCode =
                typeof error.status === 'string' ? 0 : error.status;

            addLogEntry({
                source: 'Header.tsx useGetCartQuery()',
                message: `Error: ${error.status} | ${mess}`,
                context: '',
                code: errorCode,
            });
        } else if (
            (getCartQueryError as { data: { message: string }; status: number })
                .status
        ) {
            const error = getCartQueryError as {
                data: { message: string };
                status: number;
            };

            addLogEntry({
                source: 'Header.tsx useGetCartQuery()',
                message: `Error: ${error.status} | ${error.data.message}`,
                context: '',
                code: error.status,
            });
        } else {
            addLogEntry({
                source: 'Header.tsx useGetCartQuery()',
                message: 'Unknown error format or missing details',
                context: '',
                code: 0,
            });
        }
    }

    useEffect(() => {
        if (carts) {
            dispatch(addOrderedBooks(carts));
        }
    }, [carts, dispatch]);

    useEffect(() => {
        if (userData) {
            dispatch(addUserData(userData));
        }
    }, [dispatch, userData]);

    let cartQuantity;
    let favQuantity;

    if (!isGetCartQueryLoading && Array.isArray(carts)) {
        cartQuantity = carts?.length;
    }

    if (!isGetFavQueryLoading && Array.isArray(favs)) {
        favQuantity = favs.length;
    }

    const handleModalCatalog = () => {
        dispatch(closeAllModals());
        dispatch(openModal('catalog'));
    };

    const handleCartModal = () => {
        dispatch(closeAllModals());
        dispatch(openModal('cart'));
        refetchCart();
        refetchFav();
    };

    const handleSearch = async (e: any) => {
        if (e.target.value.length >= 2) {
            setIsSearchListOpen(true);
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
        dispatch(closeAllModals());
        dispatch(openModal('burger'));
    };

    const pathname = usePathname() || '';
    const isAdminka = useMemo(() => pathname.startsWith('/admin'), [pathname]);

    const handleModalSignIn = () => {
        dispatch(closeAllModals());
        dispatch(openModal('signIn'));
    };

    const handleModalSignUp = () => {
        dispatch(closeAllModals());
        dispatch(openModal('signUp'));
    };

    const closeModals = () => {
        dispatch(closeAllModals());
    };

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
                                    width={176}
                                    height={40}
                                />
                            </Link>
                        </div>
                        <div className={styles.fromDesctop}>
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
                                <div className={styles.headerBtn}>
                                    <a
                                        className={`${styles.accountLink}`}
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
                                        <p className={styles.text}>Обране</p>
                                    </a>
                                </div>
                                <button
                                    className={`${styles.headerBtn} ${styles.text}`}
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
                                        className={`${styles.headerBtn} ${styles.text}`}
                                        onClick={() => {
                                            handleModalSignIn();
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
            <GenericModal modalName={'signIn'} align={'center'}>
                <SignIn handleModalSignUp={handleModalSignUp} />
            </GenericModal>
            <GenericModal modalName={'signUp'} align={'center'}>
                <SignUp handleModalSignIn={handleModalSignIn} />
            </GenericModal>
            <GenericModal modalName={'catalog'} align={'center'}>
                <Menu onClose={closeModals} />
            </GenericModal>
            <GenericModal modalName={'cart'} align={'center'}>
                <Basket onClose={closeModals} />
            </GenericModal>
            <GenericModal modalName={'burger'} align={'right'}>
                <Burger
                    handleModalSignIn={handleModalSignIn}
                    handleCartModal={handleCartModal}
                />
            </GenericModal>
        </>
    );
};

export default Header;
