import React, { useState } from 'react';

import modalStyles from '@/components/Modals/MainModal/MainModal.module.css';
import { Icon } from '@/components/common/Icon';
import classes from '@/components/main/DesktopCatalog/Menu.module.css';
import { setModalStatus, useDispatch } from '@/lib/redux';
import { useGetGenresQuery } from '@/lib/redux/features/book/bookApi.ts';

interface Subgenre {
    genre: string;
    count: number;
    subgenres: string[];
}

const Menu = ({ onClose }: { onClose: any }) => {
    const dispatch = useDispatch();
    const { data, isLoading } = useGetGenresQuery('');
    console.log(data);
    const [submenuData, setSubmenuData] = useState<Subgenre[]>([]);

    const handleMouseEnter = (subgenres: Subgenre[]) => {
        setSubmenuData(subgenres);
    };

    const handleMouseLeave = () => {
        setSubmenuData([]);
    };

    const handleCloseModal = () => {
        dispatch(setModalStatus(false));
        onClose();
    };

    return (
        <div
            className={classes.ai_content_wrapper}
            onMouseLeave={handleMouseLeave}
        >
            {isLoading && <div>Loading...</div>}
            <ul className={classes.menuColumn}>
                {/* {data?.map((item, index) => (
                    <MenuItem
                        key={index}
                        item={item}
                        onHover={() => console.log('In development')}
                        // onHover={() => handleMouseEnter(item.subgenres)}
                    />
                ))} */}
            </ul>
            <ul className={classes.submenuColumn}>
                {submenuData.map((subitem, index) => (
                    <li key={index} className={classes.submenuItem}>
                        {subitem.genre} ({subitem.count})
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

// const MenuItem = ({ item, onHover }) => {
//     return (
//         <li className={classes.menuItem} onMouseEnter={onHover}>
//             {item.genre} ({item.count})
//         </li>
//     );
// };

export default Menu;
