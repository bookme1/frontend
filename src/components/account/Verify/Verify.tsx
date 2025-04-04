'use client';

import React, { useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import styles from './Verify.module.css';
import { useProveTokenMutation } from '@/lib/redux/features/user/userApi';

const Verify = ({}: {}) => {
    const searchParams = useSearchParams();
    const userId = Number(searchParams ? searchParams.get('user') : 0);
    const token = searchParams ? searchParams.get('token') : '';
    const router = useRouter();

    const [proveToken, { data, isLoading, error }] = useProveTokenMutation();

    useEffect(() => {
        if (token && userId) {
            proveToken({ token, userId })
                .unwrap()
                .then(() => {
                    router.push('/account');
                })
                .catch(err => console.error('Error:', err));
        }
    }, [token, userId, proveToken, router]);

    return (
        <div className={`${styles.container}`}>
            <div className={`wrapper ${styles.container}`}>
                <h1 className={styles.title}>Верифікація пошти</h1>
                <p className={styles.text}>
                    Проводиться верифікація пошти. Будь-ласка, зачекайте...
                </p>
            </div>
        </div>
    );
};

export default Verify;
