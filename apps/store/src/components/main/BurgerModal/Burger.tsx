import React from 'react';
import { IoIosList, IoMdHeartEmpty } from 'react-icons/io';

import style from './BurgerModal.module.css';
import classes from '@/components/main/DesktopCatalog/Menu.module.css';

import { useSelector } from '../../../lib/redux';
import {
    useGetCartQuery,
    useGetFavoritesQuery,
} from '../../../lib/redux/features/book/bookApi';
import { BookType } from '../../../lib/redux/features/user/types';
import { selectUserData } from '../../../lib/redux/features/user/userSlice';
import styles from '../../common/Header/Header.module.css';
import { Icon } from '../../common/Icon';

interface BurgerProps {
    handleModalSignIn: () => void;
    handleCartModal: () => void;
}

interface HeartIconProps {
    hasFavorites: boolean | null;
    favQuantity: number | null | undefined;
}

interface BasketIconProps {
    cartQuantity: number | null | undefined;
}

const HeartIcon = ({ hasFavorites, favQuantity }: HeartIconProps) => {
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

const BasketIcon = ({ cartQuantity }: BasketIconProps) => {
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

const Burger: React.FC<BurgerProps> = ({
    handleModalSignIn,
    handleCartModal,
}) => {
    const user = useSelector(selectUserData);

    const {
        data: carts,
        refetch: refetchCart,
        isLoading: isGetCartQueryLoading,
    } = useGetCartQuery({
        type: BookType.Cart,
    });

    const {
        data: favs,
        refetch: refetchFav,
        isLoading: isGetFavQueryLoading,
    } = useGetFavoritesQuery({
        type: BookType.Fav,
    });

    let cartQuantity;
    let favQuantity;

    if (!isGetCartQueryLoading && Array.isArray(carts)) {
        cartQuantity = carts?.length;
    }

    if (!isGetFavQueryLoading && Array.isArray(favs)) {
        favQuantity = favs.length;
    }

    const hasFavorites = !!favQuantity;

    const isVisible = !!user;

    return (
        <div className={` ${classes.burger_content_wrapper}`}>
            <ul className={style.burgerList}>
                <li className={style.burgerItem}>
                    {isVisible ? (
                        <a href="/account" className={style.accountLink}>
                            <Icon name="account" size={28} />{' '}
                            <p className={style.text}>Аккаунт</p>
                        </a>
                    ) : (
                        <button
                            className={style.headerBtn}
                            onClick={() => {
                                handleModalSignIn();
                            }}
                        >
                            <Icon name="account" size={28} />{' '}
                            <p className={style.text}>Увійти</p>
                        </button>
                    )}
                </li>
                <li className={style.burgerItem}>
                    <a href="/books" className={style.accountLink}>
                        <IoIosList size={28} />
                        Каталог
                    </a>
                </li>
                <li className={style.burgerItem}>
                    <a
                        href={isVisible ? '/account/favorites' : '/favorite'}
                        className={style.accountLink}
                    >
                        <HeartIcon
                            hasFavorites={hasFavorites}
                            favQuantity={favQuantity}
                        />
                        Улюблені
                    </a>
                </li>
                <li
                    className={style.burgerItem}
                    onClick={() => {
                        handleCartModal();
                        refetchCart();
                        refetchFav();
                    }}
                >
                    <button className={style.accountLink}>
                        <BasketIcon cartQuantity={cartQuantity} />
                        Кошик
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Burger;
