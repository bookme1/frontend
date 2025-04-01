import { idLog } from '../../lib/redux/features/logs/types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL || '';

export async function getOneLog(id: string): Promise<idLog | null> {
    try {
        const response = await fetch(`${BASE_URL}/api/log/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error('Error fetching log:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error fetching log:', error);
        return null;
    }
}
