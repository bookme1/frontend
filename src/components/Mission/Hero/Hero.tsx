import React from 'react';

import styles from './Hero.module.css';

const Hero = () => {
    return (
        <section className={styles.heroSection} id="hero">
            <div className={styles.titleBox}>
                <h2 className={styles.title}>Озеленимо країну разом</h2>
                <p className={styles.subTitle}>
                    У BookME ми прагнемо не лише збагачувати світ словами, а й
                    дарувати життя природі
                </p>
            </div>
            <div className={styles.textBox}>
                <p className={styles.text}>
                    Ініціатива &quot;Озеленення Країни Разом&quot; виходить за
                    межі сторінок книг та завдяки вам стає реальністю в кожному
                    куточку нашої країни.
                </p>
                <p className={styles.text}>
                    Кожна куплена книга в BookMe – це можливість зробити світ
                    чистішим та зеленим. За кожну вашу покупку ми придбаємо
                    дерево, яке засадимо в нашому парку BookMe.
                </p>
                <p className={styles.text}>
                    Приєднуйтеся до нас у цьому екологічному подорожі! Разом ми
                    можемо створити краще майбутнє, де природа та література
                    існують у гармонії
                </p>
            </div>
        </section>
    );
};

export default Hero;
