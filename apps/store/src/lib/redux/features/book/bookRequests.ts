import axios from 'axios';

import { addLogEntry } from '../../../../contexts/Logs/fetchAddLog';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL || '';

interface GetBooksOptions {
    selectReferenceAndTitle?: boolean;
}

export const getBooks = async (options?: GetBooksOptions) => {
    try {
        const url = options?.selectReferenceAndTitle
            ? `${BASE_URL}/api/book/filter?selectReferenceAndTitle=true`
            : `${BASE_URL}/api/book`;

        const response = await axios.get(url);
        return response.data.books || [];
    } catch (error) {
        console.error('Error fetching books:', error);
        await addLogEntry({
            source: 'bookRequests.ts getBooks',
            message: `'Error fetching books:', ${error}`,
            context: '',
            code: 0,
        });
        throw error;
    }
};
