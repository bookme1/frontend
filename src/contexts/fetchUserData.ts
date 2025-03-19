import { headers } from 'next/headers';

import { addLogEntry } from './Logs/fetchAddLog';
import { IUser } from '@/lib/redux/features/user/types.ts';

export async function fetchUserData(): Promise<IUser | null> {
    const requestHeaders = await headers();

    // Take cookies from headers
    const cookies = requestHeaders.get('cookie');
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL || ''}/api/user`,
            {
                method: 'GET',
                headers: { cookie: cookies || '' },
                cache: 'no-cache',
            }
        );

        if (response.ok) {
            return await response.json();
        }

        if (response.status === 401) {
            const refreshResponse = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL || ''}/api/auth/refresh`,
                {
                    method: 'POST',
                    headers: { cookies: cookies || '' },
                }
            );

            if (refreshResponse.ok) {
                const userResponse = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL || ''}/api/user`,
                    {
                        method: 'GET',
                        headers: { cookies: cookies || '' },
                    }
                );

                if (userResponse.ok) {
                    return await userResponse.json();
                }
            }
        }

        return null;
    } catch (error) {
        console.error('Error fetching user data:', error);
        await addLogEntry({
            source: 'function fetchUserData()',
            message: `'Error fetching user data:', ${error}`,
            context: '',
            code: 0,
        });
        return null;
    }
}
