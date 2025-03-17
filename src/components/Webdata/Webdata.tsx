import React from 'react';

import styles from './Webdata.module.css';

import { Icon } from '../common/Icon';

const Webdata = ({
    onlineQuantity,
    newUsersQuantity,
    users,
}: {
    onlineQuantity: number;
    newUsersQuantity: number;
    users: number;
}) => {
    return (
        <div className={styles.container}>
            <ul className={styles.statsList}>
                <li className={styles.statItem}>
                    <div
                        className={`${styles.statHeader}`}
                        title="за поточний день"
                    >
                        <Icon name="online" className={styles.icon} />
                        <p>Онлайн</p>
                    </div>
                    <p className={`${styles.statText} ${styles.textGreen}`}>
                        {onlineQuantity}
                    </p>
                </li>

                <li className={styles.statItem}>
                    <div
                        className={`${styles.statHeader}`}
                        title="за поточний місяць"
                    >
                        <Icon name="newusers" className={styles.icon} />
                        <p>Нові користувачі</p>
                    </div>
                    <p className={`${styles.statText} ${styles.textGreen}`}>
                        +{newUsersQuantity}
                    </p>
                </li>

                <li className={styles.statItem}>
                    <div
                        className={`${styles.statHeader}`}
                        title="загальна кількість"
                    >
                        <Icon name="group" className={styles.icon} />
                        <p>Користувачі</p>
                    </div>
                    <p className={`${styles.statText} ${styles.textGreenDark}`}>
                        {users}
                    </p>
                </li>

                <li className={styles.statItem}>
                    <div className={styles.statHeader}>
                        <Icon name="traffic" className={styles.icon} />
                        <p>Трафік</p>
                    </div>
                    <p className={`${styles.statText} ${styles.textGreenDark}`}>
                        12,000
                    </p>
                </li>
            </ul>
        </div>
    );
};

export default Webdata;
