import { headers } from 'next/headers';

import { IOrderBook } from '@/lib/redux/features/order/types';


export async function fetchAllOrderedBooks(): Promise<IOrderBook[] | null> {
    const requestHeaders = headers();

    // Take cookies from headers
    const cookies = requestHeaders.get('cookie');
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL || ''}/api/order/orderedBooks`,
            {
                method: 'GET',
                headers: { cookie: cookies || '' },
                cache: 'no-cache',
            }
        );

        if (response.ok) {
            return await response.json();
        }



        return null;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}