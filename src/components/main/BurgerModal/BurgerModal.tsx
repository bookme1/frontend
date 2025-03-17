import React, { useState } from 'react';
import { IoIosList } from 'react-icons/io';

import style from './BurgerModal.module.css';
import modalStyles from '@/components/Modals/MainModal/MainModal.module.css';
import { BasketIcon, HeartIcon } from '@/components/common/Header/Header';
import { Icon } from '@/components/common/Icon';
import classes from '@/components/main/DesktopCatalog/Menu.module.css';
import {
    RootState,
    selectOpenModal,
    setModalContent,
    setModalStatus,
    useDispatch,
    useSelector,
} from '@/lib/redux';
import {
    useGetCartQuantityQuery,
    useGetCartQuery,
    useGetFavoritesQuantityQuery,
    useGetFavoritesQuery,
} from '@/lib/redux/features/book/bookApi';
import { BookType, IUser } from '@/lib/redux/features/user/types';

import { Modal } from '../Modal';

const BurgerModal: React.FC<{
    onClose: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ onClose }) => {
    const dispatch = useDispatch();
    const userData: IUser | null = useSelector(
        (state: RootState) => state.user.userData
    );
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(true);
    };

    const handleCloseModal = (event?: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(setModalStatus(false));
        if (event) onClose(event);
    };

    // const { data: favQuantity } = useGetFavoritesQuantityQuery({
    //     type: BookType.Fav,
    // });

    // const { data: cartQuantity, refetch: refetchCartQuantity } =
    //     useGetCartQuantityQuery({
    //         type: BookType.Cart,
    //     });

    // const { refetch: refetchCart } = useGetCartQuery({
    //     type: BookType.Cart,
    // });



    const handleCartModal = () => {
        dispatch(setModalStatus(true));
        dispatch(setModalContent('Cart'));
        refetchFav();
        refetchCart();
    };

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
        <div className={classes.burger_content_wrapper}>
            <button
                className={modalStyles['close-button']}
                onClick={handleCloseModal}
            >
                <Icon width={24} height={24} name={'close-ai-modal'} />
            </button>
            <ul className={style.burgerList}>
                <li className={style.burgerItem}>
                    {isVisible ? (
                        <a href="/account" className={style.accountLink}>
                            <Icon name="account" size={28} /> <p className={style.text}>Аккаунт</p>
                        </a>
                    ) : (
                        <button
                            className={style.headerBtn}
                            onClick={() => {
                                handleClick();
                                // handleCloseModal();
                            }}
                        >
                            <Icon name="account" size={28} /> <p className={style.text}>Увійти</p>
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
                    }}
                >
                    <button className={style.accountLink}>
                        <BasketIcon cartQuantity={cartQuantity} />
                        Кошик
                    </button>
                </li>
            </ul>
            {isOpen && <Modal setIsOpen={setIsOpen} />}
        </div>
    );
};

export default BurgerModal;
