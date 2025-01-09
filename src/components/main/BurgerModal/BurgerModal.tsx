import React, { useState } from 'react';
import { IoIosList, IoMdHeartEmpty } from 'react-icons/io';

import Link from 'next/link';

import { BurgerItem, BurgerList } from './BurgerModal.styles';
import { IGenre } from '@/app/book/[id]/page.types';
import modalStyles from '@/components/Modals/MainModal/MainModal.module.css';
import { FavoriteCount, HeartIcon } from '@/components/common/Header/Header';
import { Icon } from '@/components/common/Icon';
import classes from '@/components/main/DesktopCatalog/Menu.module.css';
import { setModalStatus, useDispatch } from '@/lib/redux';
import { useGetFavoritesQuantityQuery } from '@/lib/redux/features/book/bookApi';
import { BookType } from '@/lib/redux/features/user/types';

const BurgerModal: React.FC<{
    onClose: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ onClose }) => {
    const dispatch = useDispatch();

    const handleCloseModal = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(setModalStatus(false));
        onClose(event);
    };

    const token =
        typeof window !== 'undefined'
            ? localStorage.getItem('accessToken')
            : null;

    const { data: favQuantity } = useGetFavoritesQuantityQuery({
        accessToken: token ?? '',
        type: BookType.Fav,
    });

    const favoriteCount = favQuantity;
    const hasFavorites = favQuantity && favQuantity > 0;

    return (
        <div className={classes.burger_content_wrapper}>
            <button
                className={modalStyles['close-button']}
                onClick={handleCloseModal}
            >
                <Icon width={24} height={24} name={'close-ai-modal'} />
            </button>
            <BurgerList>
                <BurgerItem>
                    <Icon name="account" size={28} /> Увійти
                </BurgerItem>
                <BurgerItem>
                    <IoIosList size={28} />
                    Каталог
                </BurgerItem>
                <BurgerItem>
                    <HeartIcon hasFavorites={hasFavorites ? true : false}>
                        <IoMdHeartEmpty size={28} />
                        {hasFavorites && (
                            <FavoriteCount>{favoriteCount}</FavoriteCount>
                        )}
                    </HeartIcon>
                    Улюблені
                </BurgerItem>
                <BurgerItem>
                    <Icon name="cart" size={28} />
                    Кошик{' '}
                </BurgerItem>
            </BurgerList>
        </div>
    );
};

export default BurgerModal;
