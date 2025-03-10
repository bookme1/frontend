import { headers } from 'next/headers';

import { BookType } from '@/lib/redux/features/user/types.ts';


export async function fetchGetFavoritesQuantity(type: BookType.Fav): Promise<number| null> {
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
        console.error('Error fetching user data:', error);
        return null;
    }
}
