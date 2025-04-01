'use client';

import { useEffect, useRef, useState } from 'react';

import styles from './Characteristics.module.css';
import { ICharacteristics } from './Characteristics.types';

import { Icon } from '../../common/Icon';

const Characteristics: React.FC<{ characteristics: ICharacteristics }> = ({
    characteristics = null,
}) => {
    const [isFull, setIsFull] = useState(false);
    const [isDescFull, setIsDescFull] = useState(false);

    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const descRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (descRef.current) {
            setIsButtonVisible(descRef.current.scrollHeight > 95);
        }
    }, [characteristics?.description]);

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
        <div className={`${styles.charContainer} ${styles.wrapper}`}>
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
                        <span className={styles.charKey}>Жанр:</span>
                        <span className={styles.charValue}>
                            {characteristics?.genres}
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
                ref={descRef}
                className={`${styles.description} ${styles.desc} ${isDescFull ? styles.full : ''}`}
                dangerouslySetInnerHTML={{
                    __html: characteristics?.description || '',
                }}
                style={{
                    maxHeight: isDescFull ? 'none' : '95px',
                    overflow: 'hidden',
                }}
            ></p>
            {isButtonVisible && (
                <button
                    className={styles.fullButton}
                    onClick={() => setIsDescFull(prev => !prev)}
                >
                    {isDescFull ? 'Сховати ' : 'Показати '}
                    повний опис
                    <Icon
                        className={`${styles.full_icon} ${styles.icon}`}
                        name="arrow_down"
                    />
                </button>
            )}
        </div>
    );
};

export default Characteristics;
