import { headers } from 'next/headers';

export async function fetchUserData() {
    // Take all headers
    const requestHeaders = headers();

    // Take cookies from headers
    const cookies = requestHeaders.get('cookie');

    const response = await fetch(`http:/localhost:5050/api/user`, {
        method: 'GET',
        headers: {
            cookie: cookies || '', // Take cookies to backend
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.status}`);
    }

    return response.json();
}
