import React, { useState } from 'react';
import ContentLoader from 'react-content-loader';
import { IoIosList, IoMdHeartEmpty } from 'react-icons/io';
import { useSelector } from 'react-redux';

import style from './BurgerModal.module.css';
import { BurgerItem, BurgerList } from './BurgerModal.styles';
import baseAvatar from '@/assets/main/user.png';
import modalStyles from '@/components/Modals/MainModal/MainModal.module.css';
import { FavoriteCount, HeartIcon } from '@/components/common/Header/Header';
import { Icon } from '@/components/common/Icon';
import classes from '@/components/main/DesktopCatalog/Menu.module.css';
import { RootState, setModalStatus, useDispatch } from '@/lib/redux';
import { useGetFavoritesQuantityQuery } from '@/lib/redux/features/book/bookApi';
import { BookType, IUser } from '@/lib/redux/features/user/types';

import { Modal } from '../Modal';

const BurgerModal: React.FC<{
    onClose: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ onClose }) => {
    const isLoading = false;
    const dispatch = useDispatch();
    const userData: IUser | null = useSelector(
        (state: RootState) => state.user.userData
    );
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(true);
        handleCloseModal();
    };

    const handleCloseModal = (event?: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(setModalStatus(false));
        if (event) onClose(event);
    };

    const { data: favQuantity } = useGetFavoritesQuantityQuery({
        accessToken: '',
        type: BookType.Fav,
    });

    const favoriteCount = favQuantity;
    const hasFavorites = favQuantity && favQuantity > 0;
    console.log(userData);

    const isVisible = userData ? true : false;

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
                            <Icon name="account" size={28} /> <p>Аккаунт</p>
                        </a>
                    ) : (
                        <button
                            className={style.headerBtn}
                            onClick={() => {
                                handleClick();
                            }}
                        >
                            <Icon name="account" size={28} /> <p>Увійти</p>
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
                    <a href="" className={style.accountLink}>
                        <HeartIcon hasFavorites={hasFavorites ? true : false}>
                            <IoMdHeartEmpty size={28} />
                            {hasFavorites && (
                                <FavoriteCount>{favoriteCount}</FavoriteCount>
                            )}
                        </HeartIcon>
                        Улюблені
                    </a>
                </li>
                <li className={style.burgerItem}>
                    <a href="" className={style.accountLink}>
                        <Icon name="cart" size={28} />
                        Кошик
                    </a>
                </li>
            </ul>
            {isOpen && <Modal setIsOpen={setIsOpen} />}
        </div>
    );
};

export default BurgerModal;
