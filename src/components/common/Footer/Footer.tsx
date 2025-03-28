import Link from 'next/link';

import styles from './Footer.module.css';

import { Icon } from '../Icon';

const Footer = () => {
    const footer = {
        first: [
            {
                id: 1,
                label: 'Біографії',
                link: 'books?genre=%D0%91%D1%96%D0%BE%D0%B3%D1%80%D0%B0%D1%84%D1%96%D1%97%20%D1%82%D0%B0%20%D0%BD%D0%B5%D1%85%D1%83%D0%B4%D0%BE%D0%B6%D0%BD%D1%8F%20%D0%BB%D1%96%D1%82%D0%B5%D1%80%D0%B0%D1%82%D1%83%D1%80%D0%B0',
            },
            { id: 2, label: 'Історія', link: 'books?genre=Історія' },
            {
                id: 3,
                label: 'Психологія',
                link: 'books?genre=Психологія,%20Суспільство%20та%20соціальні%20науки',
            },
        ],
        second: [
            { id: 1, label: 'Блог', link: 'https://t.me/bookmeua' },
            { id: 2, label: 'Дитячі', link: 'books?genre=Дитяча%20література' },
            {
                id: 3,
                label: 'Умови використання сайту',
                link: 'conditions-of-use',
            },
        ],
    };

    return (
        <footer className={styles.footer}>
            <section className={styles.topSection}>
                <div className={styles.container}>
                    <div className={styles.links}>
                        <Link href="#" aria-label="Перейти на головну сторінку">
                            <Icon name="logo_white" width={176} height={40} />
                        </Link>
                        <div className={styles.social}>
                            <a
                                href="https://www.instagram.com/chervyak.ua/"
                                aria-label="Перейти на інстаграм сторінку"
                                className={styles.icon}
                            >
                                <Icon name="instagram" />
                            </a>
                            <a
                                href="https://t.me/bookmeua"
                                aria-label="Перейти на телеграм сторінку"
                                className={styles.icon}
                            >
                                <Icon name="telegram" />
                            </a>
                        </div>
                    </div>
                    <div className={styles.navigation}>
                        <h3>Каталог</h3>
                        <div className={styles.navigation__columns}>
                            <ul>
                                {footer.first.map(text => {
                                    return (
                                        <li key={text.id}>
                                            <Link href={text.link}>
                                                {text.label}
                                                <Icon
                                                    name="arrow_right"
                                                    width={24}
                                                />
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                            <ul>
                                {footer.second.map(text => {
                                    return (
                                        <li key={text.id}>
                                            <Link href={text.link}>
                                                {text.label}
                                                <Icon
                                                    name="arrow_right"
                                                    width={24}
                                                />
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className={styles.mobile__navigation}>
                        <a
                            href="https://www.instagram.com/chervyak.ua/"
                            aria-label="Перейти на інстаграм сторінку"
                            className={styles.icon}
                        >
                            <Icon name="instagram" />
                        </a>
                        <a
                            href="https://t.me/bookmeua"
                            aria-label="Перейти на телеграм сторінку"
                            className={styles.icon}
                        >
                            <Icon name="telegram" />
                        </a>
                    </div>
                </div>
            </section>
            <section className={styles.bottomSection}>
                <div>
                    <ul>
                        {/* <li>Attribution</li> */}
                        <li>©2023—2025 Copyright</li>
                        <li>
                            У разі питань писати на пошту mikhail2574@gmail.com
                        </li>
                    </ul>
                </div>
            </section>
        </footer>
    );
};

export default Footer;
