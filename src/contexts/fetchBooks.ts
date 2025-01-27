import { IBook } from '@/app/book/[id]/page.types';


export async function fetchBooks(): Promise<IBook[] | null> {

    try {
        let response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL || ''}/api/book`,
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