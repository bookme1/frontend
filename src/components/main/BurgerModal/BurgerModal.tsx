import React, { useState } from 'react';
import { IoIosList } from 'react-icons/io';
import { useSelector } from 'react-redux';

import style from './BurgerModal.module.css';
import modalStyles from '@/components/Modals/MainModal/MainModal.module.css';
import { HeartIcon } from '@/components/common/Header/Header';
import { Icon } from '@/components/common/Icon';
import classes from '@/components/main/DesktopCatalog/Menu.module.css';
import { RootState, setModalStatus, useDispatch } from '@/lib/redux';
import { useGetFavoritesQuantityQuery } from '@/lib/redux/features/book/bookApi';
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
        console.log(event);
    };

    const { data: favQuantity } = useGetFavoritesQuantityQuery({
        type: BookType.Fav,
    });

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
                            <Icon name="account" size={28} /> <p>Аккаунт</p>
                        </a>
                    ) : (
                        <button
                            className={style.headerBtn}
                            onClick={() => {
                                handleClick();
                                // handleCloseModal();
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
