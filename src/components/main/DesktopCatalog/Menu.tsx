import React, { useState } from 'react';

import Link from 'next/link';

import { IGenre } from '@/app/book/[id]/page.types';
import modalStyles from '@/components/Modals/MainModal/MainModal.module.css';
import { Icon } from '@/components/common/Icon';
import classes from '@/components/main/DesktopCatalog/Menu.module.css';
import { setModalStatus, useDispatch } from '@/lib/redux';
import { useGetGenresQuery } from '@/lib/redux/features/book/bookApi';

const Menu: React.FC<{
    onClose: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ onClose }) => {
    const dispatch = useDispatch();
    let { data, isLoading } = useGetGenresQuery('');
    if (!data?.length) data = [];

    console.log('received data GENRES');
    console.log(data);

    const [submenuData, setSubmenuData] = useState<IGenre[]>([]); // Array of strings

    const setActiveMenuItem = (index: number) => {
        const menuItems = document.querySelectorAll(
            "[data-active-handler='menu']"
        );

        menuItems.forEach(element => {
            if (element.id != `menu-item-${index}`)
                element.classList.remove(classes.menuItemActive);
            else element.classList.add(classes.menuItemActive);
        });
    };

    const handleMouseEnter = (
        subgenres: IGenre[] | undefined,
        index: number
    ) => {
        setActiveMenuItem(index);
        setSubmenuData(subgenres || []);
    };

    const handleCloseModal = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(setModalStatus(false));
        onClose(event);
    };
    return (
        <div className={classes.ai_content_wrapper}>
            {isLoading && <div>Завантажуємо каталог...</div>}
            <ul className={classes.menuColumn}>
                {data.map((item, index) => (
                    <MenuItem
                        key={index}
                        item={item}
                        id={`menu-item-${index}`}
                        onHover={() => handleMouseEnter(item.subgenres, index)}
                    />
                ))}
            </ul>
            <ul className={classes.submenuColumn}>
                {submenuData.map((subitem, index) => (
                    <SubmenuItem
                        key={index}
                        item={subitem}
                        id={`submenu-item-${index}`}
                    />
                ))}
            </ul>
            <button
                className={modalStyles['close-button']}
                onClick={handleCloseModal}
            >
                <Icon width={24} height={24} name={'close-ai-modal'} />
            </button>
        </div>
    );
};

interface MenuItemProps {
    item: IGenre;
    onHover?: () => void;
    id: string;
}

interface SubmenuItemProps {
    item: IGenre;
    id: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, onHover, id }) => {
    return (
        <li
            className={classes.menuItem}
            onMouseEnter={onHover}
            id={id}
            data-active-handler="menu"
        >
            {item.genre} ({item.count})
        </li>
    );
};

const SubmenuItem: React.FC<SubmenuItemProps> = ({ item, id }) => {
    const dispatch = useDispatch();
    return (
        <li className={classes.menuItem} id={id}>
            <Link
                href={`/books?genre=${item.genre}`}
                onClick={() => {
                    dispatch(setModalStatus(false));
                    console.log('hahaha');
                }}
            >
                {item.genre} ({item.count})
            </Link>
        </li>
    );
};

export default Menu;
