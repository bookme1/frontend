import { Logs } from '../../lib/redux/features/logs/types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL || '';

export async function getLogs(): Promise<Logs[] | null> {
    try {
        const response = await fetch(`${BASE_URL}/api/log`, {
            method: 'GET',
            cache: 'no-cache',
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error('Error fetching logs:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error fetching logs:', error);
        return null;
    }
}
