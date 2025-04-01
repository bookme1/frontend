import { headers } from 'next/headers';

import { addLogEntry } from './Logs/fetchAddLog';

import { IBook } from '../app/book/[id]/page.types';
import { BookType } from '../lib/redux/features/user/types';

export async function fetchGetFavorites(
    type: BookType.Fav
): Promise<IBook[] | null> {
    const requestHeaders = await headers();

    // Take cookies from headers
    const cookies = requestHeaders.get('cookie');
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL || ''}/api/user/books/${type}`,
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
