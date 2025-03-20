import { addLogEntry } from './Logs/fetchAddLog';
import { BookSetRequest } from '@/lib/redux/features/book/types';

export async function fetchBooksets(): Promise<BookSetRequest[] | null> {
    try {
        let response = await fetch(
            `${process.env.BASE_BACKEND_URL}/api/bookset`,
            {
                method: 'GET',
                cache: 'no-cache',
            }
        );

        if (response.ok) {
            return (response = await response.json());
        }
        return null;
    } catch (error) {
        console.error('Error fetching:', error);
        await addLogEntry({
            source: 'function fetchBooksets()',
            message: `'Error fetching:', ${error}`,
            context: '',
            code: 0,
        });
        return null;
    }
}
