import { headers } from 'next/headers';

import { BookType } from '@/lib/redux/features/user/types.ts';
import { IBook } from '@/app/book/[id]/page.types';


export async function fetchGetFavorites(type: BookType.Fav): Promise<IBook[] | null> {
    const requestHeaders = headers();

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
        console.error('Error fetching user data:', error);
        return null;
    }
}
