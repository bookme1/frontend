'use client';

import axios from 'axios';
import crypto from 'crypto';

import styles from './PingPage.module.css';
import { Webstatistics } from '@/components/Webstatistics';

interface PingPageProps {}

const PingPage: React.FC<PingPageProps> = () => {
    const mockData = [
        {
            status: 200,
            message: 'success',
            data: {
                ticketId: 131232132,
                urls: { epub: '1321321321', pdf: '123123212' },
            },
        },
        {
            status: 404,
            message: 'not found',
        },
        {
            status: 201,
            message: 'success',
            data: {
                ticketId: 131232132,
                urls: { epub: '1321321321', pdf: '123123212' },
            },
        },
    ];

    const markup = mockData.map((dataItem, index) => {
        return (
            <li className={styles.item} key={index}>
                <p
                    className={`${dataItem.status >= 300 ? styles.error : ''} ${styles.itemTitle}`}
                    title={dataItem.status.toString()}
                >
                    {dataItem.message}
                </p>
                {dataItem.data && (
                    <p>{JSON.stringify(dataItem.data)}</p> // Преобразуем объект в JSON строку для отображения
                )}
            </li>
        );
    });

    const elibri_private_key: string =
        process.env.NEXT_PUBLIC_ELIBRI_PRIVATE_KEY || '';

    const timestamp = Math.floor(Date.now() / 1000);
    const elibri_public_key = process.env.NEXT_PUBLIC_ELIBRI_PUBLIC_KEY;
    const hmac = crypto
        .createHmac('sha1', elibri_private_key)
        .update(timestamp.toString())
        .digest('base64');
    const sig = encodeURIComponent(hmac);

    const payload = {
        record_reference: '978-617-09828-4-1',
        formats: 'epub,mobi',
        visible_watermark: "bookme. User's email: mikhail2574@gmail.com",
        price: 0,
        stamp: timestamp,
        sig: sig,
        token: elibri_public_key,
    };

    async function makeRequest() {
        try {
            const response = await axios.post(
                'https://w2.elibri.com.ua/watermarking/watermark',
                payload
            );
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    makeRequest();

    return (
        <>
            <div className={`wrapper ${styles.container}`}>
                <div className={styles.subcontainer}>
                    <Webstatistics />
                </div>
                <div className={styles.loggerContainer}>
                    <h2 className={styles.title}>Логгер запитів від Elibri</h2>
                    <ul className={styles.pingList}>{markup}</ul>
                </div>
            </div>
        </>
    );
};

export default PingPage;
