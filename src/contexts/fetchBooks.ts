import { IBook } from '@/app/book/[id]/page.types';
import { addLogEntry } from './Logs/fetchAddLog';


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
        console.error('Error fetching:', error);

        await addLogEntry({
            source: 'function fetchBooks()',
            message: `'Error fetching books data:', ${error}`,
            context: '',
            code: 0,
        });

        return null;
    }
}
