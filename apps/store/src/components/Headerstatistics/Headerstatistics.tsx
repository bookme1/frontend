'use client';

import React from 'react';
import { FaUserTie } from 'react-icons/fa';

import Link from 'next/link';

import styles from './Headerstatistics.module.css';

import { useSelector } from '../../lib/redux';
import { selectUserData } from '../../lib/redux/features/user/userSlice';
import { Icon } from '../common/Icon';

const Headerstatistics = () => {
    const user = useSelector(selectUserData);

    return (
        <>
            <div className="wrapper">
                <div className={styles.logoContainer}>
                    <Link href="/" className={styles.logo}>
                        <Icon
                            className={styles.logo}
                            name="logo_black"
                            width={176}
                            height={40}
                        />
                    </Link>
                    <div className={styles.userContainer}>
                        <p>{user?.username}</p>
                        <FaUserTie size={40} color="#000" />
                        <Icon name="exit" className={styles.exitIcon} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Headerstatistics;
