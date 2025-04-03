import { addLogEntry } from "@/contexts/Logs/fetchAddLog";
import { IUser } from "@/lib/redux/features/user/types";


export async function fetchUserData(url: string | undefined): Promise<IUser | null> {
    const backendUrl = url + '/api';
    const cookies = document.cookie; // Получаем cookies на клиенте

    try {
        // Получаем данные пользователя
        const response = await fetch(`${backendUrl}/user`, {
            method: 'GET',
            headers: { cookie: cookies || '' },
            credentials: 'include',
            cache: 'no-cache',
        });

        if (response.ok) {
            return await response.json();
        }

        // Если не авторизован, пробуем обновить токен
        if (response.status === 401) {
            const refreshResponse = await fetch(`${backendUrl}/auth/refresh`, {
                method: 'POST',
                credentials: 'include',
                headers: { cookie: cookies || '' }, // Передаем cookies для refresh
            });

            if (refreshResponse.ok) {
                const userResponse = await fetch(`${backendUrl}/user`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: { cookie: cookies || '' }, // Передаем cookies
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
