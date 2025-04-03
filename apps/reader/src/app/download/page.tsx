'use client';

import { useState } from 'react';
import { saveEpubToIndexedDB } from '../../../../shared/indexed-db-util';



export default function DownloadPage() {
    const [status, setStatus] = useState('');

    const handleDownload = async () => { 
        try {
            setStatus('Скачивание...');
            const response = await fetch(
                'http://localhost:5050/api/book/download-from-url?url=' +
                    encodeURIComponent(
                        'https://download.elibri.com.ua/d/52c977dcc79a9b99912a77c3/409a42315871a82442077dd31bc55323310d52561ed9c0c253e2dc63265e1f65/%D0%BF%D1%96%D0%B2%D0%BD%D0%B8%D0%BA-%D1%82%D0%B0-%D0%B4%D0%B2%D0%BE%D1%94-%D0%BC%D0%B8%D1%88%D0%B5%D0%BD%D1%8F%D1%82.epub'
                    )              // сделать универсальные адреса
            );

            const blob = await response.blob();

            await saveEpubToIndexedDB('півник-щось-там.epub', blob); //передавать id

            setStatus('Книга успешно сохранена оффлайн!');
        } catch (err) {
            console.error(err);
            setStatus('Ошибка при скачивании');
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>Скачать книгу для оффлайн-чтения</h1>
            <button onClick={handleDownload} style={{ padding: '8px 16px' }}>
                Скачать оффлайн
            </button>
            {status && <p>{status}</p>}
        </div>
    );
}
