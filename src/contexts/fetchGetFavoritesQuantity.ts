import { headers } from 'next/headers';

import { BookType } from '@/lib/redux/features/user/types.ts';
import { addLogEntry } from './Logs/fetchAddLog';


export async function fetchGetFavoritesQuantity(type: BookType.Fav): Promise<number | null> {
    const requestHeaders = headers();

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
        console.error('Error fetching:', error);
        await addLogEntry({
            source: 'function fetchGetFavorites',
            message: `'Error fetching:', ${error}`,
            context: '',
            code: 0,
        });
        return null;
    }
}
