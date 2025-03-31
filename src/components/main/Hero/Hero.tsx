import styles from './Hero.module.css';
import HeroImage from './HeroImage/HeroImage';
import { Icon } from '@/components/common/Icon';

const Hero = () => {
    return (
        <section className={styles.heroSection}>
            <div className={`wrapper ${styles.heroWrapper}`}>
                <nav className={`${styles.navigation} ${styles.nav}`}>
                    <ul className={styles.navList}>
                        {/* <li className={`${styles.navItem} ${styles.accent}`}>
                            <a className={styles.navLink} >Акції</a>
                        </li> */}
                        <li className={styles.navItem}>
                            <a className={styles.navLink} href="/books">
                                Каталог книжок
                                <Icon
                                    name="arrow_right"
                                    className={styles.icon}
                                />
                            </a>
                        </li>
                        <li className={styles.navItem}>
                            <a
                                className={styles.navLink}
                                href="/books?genre=Кримінал"
                            >
                                Кримінальні історії
                                <Icon
                                    name="arrow_right"
                                    className={styles.icon}
                                />
                            </a>
                        </li>
                        <li className={styles.navItem}>
                            <a
                                className={styles.navLink}
                                href="/books?genre=художня література"
                            >
                                Художня література
                                <Icon
                                    name="arrow_right"
                                    className={styles.icon}
                                />
                            </a>
                        </li>
                        <li className={styles.navItem}>
                            <a
                                className={styles.navLink}
                                href="/books?genre=Фантастика"
                            >
                                Фантастика
                                <Icon
                                    name="arrow_right"
                                    className={styles.icon}
                                />
                            </a>
                        </li>
                        <li className={styles.navItem}>
                            <a
                                className={styles.navLink}
                                href="/books?genre=Наука"
                            >
                                Наука
                                <Icon
                                    name="arrow_right"
                                    className={styles.icon}
                                />
                            </a>
                        </li>
                    </ul>
                </nav>
                <div className={styles.imgCotainer}>
                    <HeroImage />
                    <h1 className={styles.heroTitle}>Українські книжки</h1>
                    <p className={styles.heroDescription}>
                        Книги, що змінюють світ, тепер доступні для всього
                        світу!
                    </p>
                    <a
                        className={`${styles.inSlider} ${styles.catalogBtn}`}
                        href="/books"
                    >
                        До каталогу
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
