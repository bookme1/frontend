'use client';

import React from 'react';
import { FaCodePullRequest } from 'react-icons/fa6';
import { GrUpdate } from 'react-icons/gr';

import Image from 'next/image';

import styles from './Webstatistics.module.css';
import Gear from '@/assets/account/gear.png';

import { Icon } from '../common/Icon';

const Webstatistics = () => {
    return (
        <>
            <div className={styles.container}>
                <ul className={styles.menuList}>
                    <li className={styles.menuItem}>
                        <button className={styles.menuItemButton}>
                            <Icon name="mainhome" />
                            <a
                                href="/admin"
                                className={styles.menuItemTextHover}
                            >
                                Головна
                            </a>
                        </button>
                    </li>

                    <li className={styles.menuItem}>
                        <button className={styles.menuItemButton}>
                            <GrUpdate />
                            <a
                                href="/admin/book-update"
                                className={styles.menuItemTextHover}
                            >
                                Стягнути нові книжки
                            </a>
                        </button>
                    </li>

                    <li className={styles.menuItem}>
                        <button className={styles.menuItemButton}>
                            <Icon name="group" />
                            <a
                                href="/admin/users"
                                className={styles.menuItemTextHover}
                            >
                                Користувачі
                            </a>
                        </button>
                    </li>

                    <li className={styles.menuItem}>
                        <button className={styles.menuItemButton}>
                            <FaCodePullRequest />
                            <a
                                href="/admin/ping"
                                className={styles.menuItemTextHover}
                            >
                                Elibri Запити
                            </a>
                        </button>
                    </li>

                    <li className={styles.menuItem}>
                        <button className={styles.menuItemButton}>
                            <Icon name="menubook" />
                            <p className={styles.menuItemText}>Книги</p>
                        </button>
                    </li>

                    <li className={styles.menuItem}>
                        <button className={styles.menuItemButton}>
                            <Icon name="album" />
                            <a
                                href="/admin/booksets"
                                className={styles.menuItemTextHover}
                            >
                                Набори
                            </a>
                        </button>
                    </li>

                    <li className={styles.menuItem}>
                        <button className={styles.menuItemButton}>
                            <Icon name="sales" />
                            <p className={styles.menuItemText}>Продажі</p>
                        </button>
                    </li>

                    <li className={styles.menuItem}>
                        <button className={styles.menuItemButton}>
                            <Icon name="localization" />
                            <p className={styles.menuItemText}>Локалізація</p>
                        </button>
                    </li>

                    <li className={styles.menuItem}>
                        <button className={styles.menuItemButton}>
                            <Image
                                src={Gear}
                                alt="Settings"
                                className={styles.settingsImg}
                            />
                            <p className={styles.menuItemText}>Оновити даннi</p>
                        </button>
                    </li>

                    <li className={styles.menuItem}>
                        <button className={styles.menuItemButton}>
                            <Icon name="album" />
                            <a
                                href="/admin/logs"
                                className={styles.menuItemTextHover}
                            >
                                Logs
                            </a>
                        </button>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Webstatistics;
