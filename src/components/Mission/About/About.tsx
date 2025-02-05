import React from 'react';

import Image from 'next/image';

import styles from './About.module.css';

import aboutImage from '../../../assets/mission/about-image.webp';

const About = () => {
    return (
        <section className={styles.aboutSection} id="about">
            <h2 className={styles.aboutTitle}>ПРО НАС</h2>
            <p className={styles.aboutSubTitle}>
                Ласкаво просимо в BookME – ваш особистий космос для літературних
                відкриттів та важливих змін.{' '}
            </p>
            <div className={styles.aboutBox}>
                <Image src={aboutImage} alt="staff" width={525} height={328} />
                <div className={styles.aboutTextBox}>
                    <p className={styles.text}>
                        У BookME ми віримо, що кожна книга – це можливість
                        відкрити нові горизонти та надихнути на позитивні зміни.
                        Наша місія – створити простір, де слово перетворюється
                        на дію, а читання стає силою для добра.
                    </p>
                    <p className={styles.text}>
                        Зелений Куточок для Читання: Відділ &quot;BookNook&quot;
                        – це наш унікальний простір для тих, хто цінує атмосферу
                        літературного занурення. Затишне місце для читання, де
                        ви можете насолоджуватися обраною книгою в затишному
                        середовищі.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
