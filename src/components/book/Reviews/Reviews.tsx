'use client';

import styles from './Reviews.module.css';
import { Icon } from '@/components/common/Icon';

const Reviews = () => {
    const mockUser = {
        name: 'Акакій',
        date: new Date(),
        grade: 3,
        comment:
            'Практика усвідомленості на Заході давно рятує мільйони людей від хронічного стресу',
    };

    const gradeMarkup = (grade: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            const isActive = i <= grade;
            stars.push(
                <button className={styles.grade} key={i}>
                    <Icon
                        name="star"
                        className={`${isActive ? 'active' : ''} ${styles.icon}`}
                        size={30}
                    />
                </button>
            );
        }
        return stars;
    };

    return (
        <div className={styles.wrapper}>
            <section className={styles.reviewsContainer}>
                <h2 className={styles.title}>Відгуки</h2>
                <div className={styles.controlsContainer}>
                    <button
                        className={`${styles.active} ${styles.controlsButton}`}
                    >
                        Читати
                    </button>
                    <button className={styles.controlsButton}>
                        Додати відгук
                    </button>
                </div>
                <div className={styles.review}>
                    <div className={styles.topContainer}>
                        <div className={styles.topLeftContainer}>
                            <p className={styles.reviewUsername}>
                                {mockUser.name}
                            </p>
                            <p className={styles.reviewDate}>
                                {mockUser.date.toLocaleDateString()}
                            </p>
                        </div>
                        <div className={styles.gradeContainer}>
                            {gradeMarkup(mockUser.grade)}
                        </div>
                    </div>
                    <p className={styles.comment}>{mockUser.comment}</p>
                </div>
            </section>
        </div>
    );
};

export default Reviews;
