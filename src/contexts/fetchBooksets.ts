import { BookSetRequest } from '@/lib/redux/features/book/types';

export async function fetchBooksets(): Promise<BookSetRequest[] | null> {

    try {
        let response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL || ''}/api/bookset`,
            {
                method: 'GET',
                cache: 'no-cache',

            }
        );

        if (response.ok) {
            return response = await response.json();
        }
        return null;
    }


    catch (error) {
        console.error('Error fetching filters data:', error);
        return null;
    }
}
