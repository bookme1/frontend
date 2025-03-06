import React, { useState } from 'react';

import Image from 'next/image';

import styles from './Seedlings.module.css';

import earth from '../../../assets/mission/earth.webp';

const Seedlings = () => {
    const [treesQuantity, setTreesQuantity] = useState(1);

    const decrement = () => {
        if (treesQuantity === 1) return;
        setTreesQuantity(treesQuantity - 1);
    };

    const increment = () => {
        setTreesQuantity(treesQuantity + 1);
    };

    return (
        <section className={styles.seedlingsSection} id="seedlings">
            <h2 className={styles.title}>Я ДОПОМАГАЮ ПЛАНЕТІ</h2>
            <p className={styles.text}>Скільки дерев бажаєте саджати?</p>
            <div className={styles.contentBox}>
                <Image
                    src={earth}
                    alt="earth"
                    width={363}
                    height={366}
                    className={styles.earthImg}
                />
                <div className={styles.priceContentBox}>
                    <div className={styles.priceBox}>
                        <svg
                            width="38"
                            height="37"
                            viewBox="0 0 38 37"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M11.4727 30.5215H26.5264"
                                stroke="#5DDD3D"
                                stroke-width="3.01075"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M15.9902 30.5215C24.2698 26.7581 17.1945 20.8871 20.5064 15.4678"
                                stroke="#5DDD3D"
                                stroke-width="3.01075"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M15.2366 14.5643C16.8925 15.7686 17.9463 17.8761 18.699 20.1342C15.6882 20.7363 13.4301 20.7363 11.4732 19.6825C9.66671 18.7793 8.01079 16.8223 6.95703 13.36C11.1721 12.6073 13.5807 13.36 15.2366 14.5643V14.5643Z"
                                stroke="#5DDD3D"
                                stroke-width="3.01075"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M22.1615 9.4463C21.0138 11.24 20.4364 13.3394 20.5056 15.4678C23.3658 15.3173 25.4733 14.5646 26.9787 13.3603C28.4841 11.8549 29.3873 9.89791 29.5378 6.43555C25.4733 6.58608 23.5163 7.94092 22.1615 9.4463Z"
                                stroke="#5DDD3D"
                                stroke-width="3.01075"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                        <p className={styles.price}>25 грн</p>
                    </div>
                    <div className={styles.btnBox}>
                        <button className={styles.rangeBtn} onClick={decrement}>
                            -
                        </button>
                        <input
                            type="text"
                            value={treesQuantity}
                            className={styles.ragne}
                        />
                        <button className={styles.rangeBtn} onClick={increment}>
                            +
                        </button>
                    </div>
                </div>
                <button className={styles.payBtn}>Оплатити з monobank</button>
            </div>
        </section>
    );
};

export default Seedlings;
