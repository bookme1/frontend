import React, { useState } from 'react';

import modalStyles from '@/components/Modals/MainModal/MainModal.module.css';
import { Icon } from '@/components/common/Icon';
import classes from '@/components/main/DesktopCatalog/Menu.module.css';
import { setModalStatus, useDispatch } from '@/lib/redux';
import { useGetGenresQuery } from '@/lib/redux/features/book/bookApi';

interface IGenre {
    genre: string;
    count: number;
    subgenres: string[]; // Масив рядків
}

const Menu: React.FC<{
    onClose: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ onClose }) => {
    const dispatch = useDispatch();
    const { data, isLoading } = useGetGenresQuery('');
    console.log(data);

    const [submenuData, setSubmenuData] = useState<string[]>([]); // Масив рядків

    const handleMouseEnter = (subgenres: string[]) => {
        setSubmenuData(subgenres);
    };

    const handleMouseLeave = () => {
        setSubmenuData([]);
    };

    const handleCloseModal = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(setModalStatus(false));
        onClose(event);
    };

    return (
        <div
            className={classes.ai_content_wrapper}
            onMouseLeave={handleMouseLeave}
        >
            {isLoading && <div>Loading...</div>}
            <ul className={classes.menuColumn}>
                {data?.map((item, index) => (
                    <MenuItem
                        key={index}
                        item={item}
                        onHover={() => handleMouseEnter(item.subgenres)}
                    />
                ))}
            </ul>
            <ul className={classes.submenuColumn}>
                {submenuData.map((subitem, index) => (
                    <li key={index} className={classes.submenuItem}>
                        {subitem}
                    </li>
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
    onHover: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, onHover }) => {
    return (
        <li className={classes.menuItem} onMouseEnter={onHover}>
            {item.genre} ({item.count})
        </li>
    );
};

export default Menu;
