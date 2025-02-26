'use client';

import { useEffect, useState } from 'react';

import styles from './Characteristics.module.css';
import { ICharacteristics } from './Characteristics.types';
import { Icon } from '@/components/common/Icon';

const Characteristics: React.FC<{ characteristics: ICharacteristics }> = ({
    characteristics = null,
}) => {
    const [isFull, setIsFull] = useState(false);
    const [isDescFull, setIsDescFull] = useState(false);
    useEffect(() => {
        if (isDescFull == true) {
            document.querySelector('.description')?.classList.add('full');
            document.querySelector('.full_icon')?.classList.add('full');
        } else {
            document.querySelector('.description')?.classList.remove('full');
            document.querySelector('.full_icon')?.classList.remove('full');
        }
    }, [isDescFull]);
    useEffect(() => {
        if (isFull == true) {
            document.querySelector('.full_icon_char')?.classList.add('full');
        } else {
            document.querySelector('.full_icon_char')?.classList.remove('full');
        }
    }, [isFull]);

    return (
        <div className={styles.charContainer}>
            <h2 className={styles.title}>Характеристики</h2>
            <ul className={styles.charList}>
                <li className={styles.charItem}>
                    <span className={styles.charKey}>Мова:</span>
                    <span className={styles.charValue}>
                        {characteristics?.language === 'ukr'
                            ? 'Українська'
                            : characteristics?.language}
                    </span>
                </li>
                <li className={styles.charItem}>
                    <span className={styles.charKey}>Видавництво:</span>
                    <span className={styles.charValue}>
                        {characteristics?.publish}
                    </span>
                </li>
                <li className={styles.charItem}>
                    <span className={styles.charKey}>Кількість сторінок:</span>
                    <span className={styles.charValue}>
                        {characteristics?.pages}
                    </span>
                </li>
                {isFull && (
                    <li className={styles.charItem}>
                        <span className={styles.charKey}>Обкладинка:</span>
                        <span className={styles.charValue}>
                            Тут будут жанры в ближайшем будущем
                        </span>
                    </li>
                )}
            </ul>
            <button
                className={styles.fullButton}
                onClick={() => {
                    setIsFull(prev => !prev);
                }}
            >
                {isFull ? 'Сховати ' : 'Показати '}
                всі характеристики{' '}
                <Icon
                    className={`${styles.full_icon_char} ${styles.icon}`}
                    name="arrow_down"
                />
            </button>
            <h2 className={styles.title}>Опис</h2>
            {/* <div className={styles.controlBtnBox}>
                <button className={`${styles.active} ${styles.mobile} ${styles.controlButton}`}>Сюжет</button>
                <button className={`${styles.mobile} ${styles.disabled} ${styles.controlButton}`}>
                    Читати уривок
                </button>
                <button className={`${styles.quote} ${styles.disabled} ${styles.controlButton}`}>
                    Цитати з книгиz
                </button>
            </div> */}
            <p
                className={`${styles.description} ${styles.desc}`}
                dangerouslySetInnerHTML={{
                    __html: characteristics?.description || '',
                }}
            ></p>
            <button
                className={styles.fullButton}
                onClick={() => {
                    setIsDescFull(prev => !prev);
                }}
            >
                {isDescFull ? 'Сховати ' : 'Показати '}
                повний опис
                <Icon
                    className={`${styles.full_icon} ${styles.icon}`}
                    name="arrow_down"
                />
            </button>
        </div>
    );
};

export default Characteristics;
