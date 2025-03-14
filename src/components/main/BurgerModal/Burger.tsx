import React from 'react';
import { IoIosList } from 'react-icons/io';

import style from './BurgerModal.module.css';
import { BasketIcon, HeartIcon } from '@/components/common/Header/Header';
import { Icon } from '@/components/common/Icon';
import classes from '@/components/main/DesktopCatalog/Menu.module.css';
import { RootState, useSelector } from '@/lib/redux';
import {
    useGetCartQuery,
    useGetFavoritesQuery,
} from '@/lib/redux/features/book/bookApi';
import { BookType, IUser } from '@/lib/redux/features/user/types';

interface BurgerProps {
    handleModalSignIn: () => void;
    handleCartModal: () => void;
}

const Burger: React.FC<BurgerProps> = ({
    handleModalSignIn,
    handleCartModal,
}) => {
    const userData: IUser | null = useSelector(
        (state: RootState) => state.user.userData
    );

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

    if (!isGetCartQueryLoading && Array.isArray(carts?.data)) {
        cartQuantity = carts?.data.length;
    }

    if (!isGetFavQueryLoading && Array.isArray(favs)) {
        favQuantity = favs.length;
    }

    const hasFavorites = !!favQuantity;

    const isVisible = Object.keys(userData).length > 0 ? true : false;

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
