import React, { useState } from 'react';
import ContentLoader from 'react-content-loader';

import Link from 'next/link';

import { IGenre } from '@/app/book/[id]/page.types';
import classes from '@/components/main/DesktopCatalog/Menu.module.css';
import { useGetGenresQuery } from '@/lib/redux/features/book/bookApi';

interface MenuProps {
    onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ onClose }) => {
    let { data, isLoading } = useGetGenresQuery('');
    if (!data?.length) data = [];

    const [submenuData, setSubmenuData] = useState<IGenre[]>([]);

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

    const handleCloseModal = () => {
        onClose();
    };
    return (
        <div className={classes.ai_content_wrapper}>
            {isLoading ? (
                <ul className={classes.menuColumn}>
                    <ContentLoader
                        viewBox="0 0 400 300"
                        width={400}
                        height={300}
                    >
                        <rect
                            x="0"
                            y="0"
                            rx="5"
                            ry="5"
                            width="444"
                            height="40"
                        />
                        <rect
                            x="0"
                            y="50"
                            rx="5"
                            ry="5"
                            width="444"
                            height="40"
                        />
                        <rect
                            x="0"
                            y="100"
                            rx="5"
                            ry="5"
                            width="444"
                            height="40"
                        />
                        <rect
                            x="0"
                            y="150"
                            rx="5"
                            ry="5"
                            width="444"
                            height="40"
                        />
                        <rect
                            x="0"
                            y="200"
                            rx="5"
                            ry="5"
                            width="444"
                            height="40"
                        />
                        <rect
                            x="0"
                            y="250"
                            rx="5"
                            ry="5"
                            width="444"
                            height="40"
                        />
                    </ContentLoader>
                </ul>
            ) : (
                <>
                    <ul className={classes.menuColumn}>
                        {data.map((item, index) => (
                            <MenuItem
                                key={index}
                                item={item}
                                id={`menu-item-${index}`}
                                onHover={() =>
                                    handleMouseEnter(item.children, index)
                                }
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
                </>
            )}
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
    return (
        <li className={`${classes.menuItem}`} id={id}>
            <Link
            className={` ${classes.cut}`}
                href={`/books?genre=${item.genre}`}
                onClick={() => {
                    console.log('hahaha');
                }}
            >
                {item.genre} ({item.count})
            </Link>
        </li>
    );
};

export default Menu;
