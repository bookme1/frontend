

import { addLogEntry } from './Logs/fetchAddLog';

import { IUser } from '../lib/redux/features/user/types';
import { headers } from 'next/headers';

export async function fetchUserData(): Promise<IUser | null> {
    const requestHeaders = await headers();
    const backendUrl = process.env.BASE_BACKEND_URL + '/api';
    // Take cookies from headers
    const cookies = requestHeaders.get('cookie');
    try {
        const response = await fetch(`${backendUrl}/user`, {
            method: 'GET',
            headers: { cookie: cookies || '' },
            credentials: 'include',
            cache: 'no-cache',
        });

        if (response.ok) {
            return await response.json();
        }

        if (response.status === 401) {
            const refreshResponse = await fetch(`${backendUrl}/auth/refresh`, {
                method: 'POST',
                credentials: 'include',
                headers: { cookies: cookies || '' },
            });

            if (refreshResponse.ok) {
                const userResponse = await fetch(`${backendUrl}/user`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: { cookies: cookies || '' },
                });

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
