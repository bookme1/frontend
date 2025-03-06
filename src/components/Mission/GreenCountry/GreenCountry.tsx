import React from 'react';

import Image from 'next/image';

import styles from './GreenCountry.module.css';

import first from '../../../assets/mission/1.webp';
import second from '../../../assets/mission/2.webp';
import third from '../../../assets/mission/3.webp';
import fourth from '../../../assets/mission/4.webp';

const GreenCountry = () => {
    return (
        <section className={styles.greeCountySection} id="greenCounty">
            <h2 className={styles.title}>ЗЕЛЕНА КРАЇНА</h2>
            <div className={styles.textBox}>
                <div className={styles.rowBox}>
                    <p className={`${styles.text} ${styles.left}`}>
                        Збір коштів (до літа 2024): Зробіть внесок на нашому
                        сайті для реалізації проєкту відновлення природи. Ми
                        збираємо n-ну суму до літа 2024 року, щоб створити
                        зелені оази в нашому регіоні.
                    </p>
                    <p className={`${styles.text} ${styles.right}`}>
                        Голосування за проєкти відновлення: Оберіть, куди
                        спрямувати ваш внесок. Голосуйте за один з 6 варіантів
                        проєктів, щоб визначити, яке відновлення природи вам
                        найбільше до вподоби.
                    </p>
                </div>
                <div className={styles.rowBox}>
                    <p className={`${styles.text} ${styles.left}`}>
                        Підготовка до висадки: Ми активно готуємося до
                        висадження дерев разом з вами. Отримайте інформацію про
                        локації, дозволи та придбані матеріали для старту нашого
                        екологічного проєкту.
                    </p>
                    <p className={`${styles.text} ${styles.right}`}>
                        Висадження разом з усіма охочими: Приєднуйтеся до нашого
                        колективу на заході висадження! Надійна інструкція,
                        безпечне обладнання та приємні бонуси допоможуть
                        створити живий ліс разом. Спільно ми змінюємо світ – від
                        донатів до висадження, крок за кроком.
                    </p>
                </div>
                <Image
                    src={first}
                    width={120}
                    height={231}
                    alt="1"
                    className={styles.firstImg}
                />
                <Image
                    src={second}
                    width={120}
                    height={231}
                    alt="2"
                    className={styles.secondImg}
                />
                <Image
                    src={third}
                    width={120}
                    height={231}
                    alt="3"
                    className={styles.thirdImg}
                />
                <Image
                    src={fourth}
                    width={120}
                    height={231}
                    alt="4"
                    className={styles.fourthImg}
                />
            </div>
        </section>
    );
};

export default GreenCountry;
