'use client';

import React from 'react';

import loaderData from '/src/assets/book_animation.json';
import dynamic from 'next/dynamic';

import styles from './Loading.module.css';

import { Icon } from '../../common/Icon';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
const Loading = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <Lottie
                    className={styles.styledLottie}
                    animationData={loaderData}
                    loop={true}
                />
                <div className={styles.centringLogo}>
                    <a href="/">
                        <Icon className={styles.icon} name="logo_black" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Loading;
