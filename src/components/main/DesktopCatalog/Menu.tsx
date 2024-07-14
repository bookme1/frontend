import classes from "@/components/main/DesktopCatalog/Menu.module.css";
import React, { useState } from 'react';
import { useGetGenresQuery } from "@/lib/redux/features/book/bookApi.ts";

interface Subgenre {
    genre: string;
    count: number;
    subgenres: string[]
}

const Menu = () => {
    const { data, isLoading } = useGetGenresQuery("");
    console.log(data)
    const [submenuData, setSubmenuData] =  useState<Subgenre[]>([]);


    const handleMouseEnter = (subgenres: Subgenre[]) => {
        setSubmenuData(subgenres);
        console.log("inside menu");
    };

    const handleMouseLeave = () => {
        setSubmenuData([]);
        console.log("leave")
    };

    return (
        <div className={classes.ai_content_wrapper} onMouseLeave={handleMouseLeave}>
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
                        {subitem.genre} ({subitem.count})
                    </li>
                ))}
            </ul>

        </div>
    );
};

const MenuItem = ({ item, onHover }) => {
    return (
        <li
            className={classes.menuItem}
            onMouseEnter={onHover}
        >
            {item.genre} ({item.count})
        </li>
    );
};

export default Menu;
