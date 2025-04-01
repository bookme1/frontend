import { addLogEntry } from './Logs/fetchAddLog';

import { IBook } from '../app/book/[id]/page.types';

export async function FetchBookById(
    id: string
): Promise<IBook | null | undefined> {
    try {
        let response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL || ''}/api/book/${id}`,
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
            source: 'function FetchBookById',
            message: `'Error fetching:', ${error}`,
            context: '',
            code: 0,
        });
        return null;
    }
}
