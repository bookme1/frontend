import React from 'react';

import Link from 'next/link';

import styles from './Navigation.module.css';

const Navigation = () => {
    return (
        <nav className={styles.container}>
            <ul className={styles.navList}>
                <Link href="#hero" className={styles.navLink}>
                    Озеленення
                </Link>
                <Link href="#about" className={styles.navLink}>
                    Про нас
                </Link>
                <Link href="#greenCounty" className={styles.navLink}>
                    Зелена країна
                </Link>
                <Link href="#statistic" className={styles.navLink}>
                    Статистика
                </Link>
                <Link href="#seedlings" className={styles.navLink}>
                    Сажанці
                </Link>
                <Link href="#gallery" className={styles.navLink}>
                    Фотогалерея
                </Link>

                <button className={styles.navBtn}>
                    Долучайся до GREEN акції
                </button>
            </ul>
        </nav>
    );
};

export default Navigation;
