import { headers } from 'next/headers';

import { addLogEntry } from './Logs/fetchAddLog';
import { BookType } from '@/lib/redux/features/user/types.ts';

export async function fetchGetCartssQuantity(
    type: BookType.Cart
): Promise<number | null> {
    const requestHeaders = await headers();

    // Take cookies from headers
    const cookies = requestHeaders.get('cookie');
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL || ''}/api/user/books/quantity/${type}`,
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
        await addLogEntry({
            source: 'function fetchGetCartssQuantity',
            message: `'Error fetching:', ${error}`,
            context: '',
            code: 0,
        });
        return null;
    }
}
