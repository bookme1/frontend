import { addLogEntry } from './Logs/fetchAddLog';

import { BookSetRequest } from '../lib/redux/features/book/types';

export async function fetchBooksets(): Promise<BookSetRequest[] | null> {
    const baseBackendUrl = process.env.NEXT_PUBLIC_BASE_BACKEND_URL;
    try {
        let response = await fetch(`${baseBackendUrl}/api/bookset`, {
            method: 'GET',
            cache: 'no-cache',
        });

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
