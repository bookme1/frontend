import Link from 'next/link';

import styles from './Footer.module.css';

import { Icon } from '../Icon';

const Footer = () => {
    const footer = {
        first: [
            { id: 1, label: 'Акції', link: '#' },
            { id: 2, label: 'Комплекти', link: '#' },
            { id: 3, label: 'Магазин BookMe', link: '#' },
        ],
        second: [
            { id: 1, label: 'Блог', link: 'https://t.me/bookmeua' },
            { id: 2, label: 'Дитячі', link: 'books?genre=Детские' },
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
                        <li>Attribution</li>
                        <li>©2023— Copyright</li>
                        <li>Privacy</li>
                    </ul>
                </div>
            </section>
        </footer>
    );
};

export default Footer;
