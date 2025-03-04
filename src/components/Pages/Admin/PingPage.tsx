'use client';

import axios from 'axios';
import crypto from 'crypto';
import { Webstatistics } from '@/components/Webstatistics';

import {
    Item,
    ItemData,
    ItemTitle,
    PingList,
    Title,
} from '../../../app/admin/ping/page.style';

interface PingPageProps {

}

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
            <Item key={index}>
                <ItemTitle
                    className={dataItem.status >= 300 ? 'error' : ''}
                    title={dataItem.status.toString()}
                >
                    {dataItem.message}
                </ItemTitle>
                {dataItem.data && (
                    <ItemData>{JSON.stringify(dataItem.data)}</ItemData> // Преобразуем объект в JSON строку для отображения
                )}
            </Item>
        );
    });

    const secret = '1b41d378b24738917d314dff5c816b61';
    const timestamp = Math.floor(Date.now() / 1000);
    const hmac = crypto
        .createHmac('sha1', secret)
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
        token: 'e_wa_97fd26f52e0505e68ec782ea_test',
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
          
            <div className="flex gap-10">
                <div className="flex flex-row mt-10">
                    <Webstatistics />
                </div>
                <div className="w-11/12">
                    <Title>Логгер запитів від Elibri</Title>
                    <PingList>{markup}</PingList>
                </div>
            </div>
        </>
    );
};

export default PingPage;
