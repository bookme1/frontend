'use client';

import React, { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import styles from './Verify.module.css';
import { useProveTokenMutation } from '@/lib/redux/features/user/userApi';

const Verify = ({}: {}) => {
    const searchParams = useSearchParams();

    const userId = searchParams ? Number(searchParams.get('user')) || 0 : 0;
    const token = searchParams ? (searchParams.get('token') ?? '') : '';

    const [proveToken, { data, isLoading, error }] = useProveTokenMutation();

    useEffect(() => {
        if (token && userId) {
            proveToken({ token, userId })
                .unwrap()
                .then(response => console.log('Success:', response.message))
                .catch(err => console.error('Error:', err));
        }
    }, [token, userId, proveToken]);

    return (
        <>
            <div className={`wrapper ${styles.container}`}>
                <h1 className={styles.title}>Верифікація пошти</h1>
                <p className={styles.text}>
                    Проводиться верифікація пошти. Будь-ласка, зачекайте...
                </p>
            </div>
        </>
    );
};

export default Verify;
