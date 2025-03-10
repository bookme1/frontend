import { useCallback, useState } from 'react';

import {
    IUser,
    UserResponse,
    loginOutputDTO,
} from '@/lib/redux/features/user/types.ts';
import { addLogEntry } from './Logs/fetchAddLog';


const fetchUserData = async (
    accessToken: string | null,
    refreshToken: string | null
): Promise<UserResponse> => {
    try {
        if (!accessToken && !refreshToken) {
            return null;
        }

        if (accessToken) {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL || ''}/api/user`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (response.ok) {
                const data = await response.json();
                return data;
            }
        }

        if (refreshToken) {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL || ''}/api/auth/refresh`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${refreshToken}`,
                    },
                }
            );

            if (response.ok) {
                const refreshData = await response.json();
                sessionStorage.setItem(
                    'accessToken',
                    refreshData.tokens.accessToken
                );
                sessionStorage.setItem(
                    'refreshToken',
                    refreshData.tokens.refreshToken
                );

                const userResponse = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL || ''}/api/user`,
                    {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${refreshData.tokens.accessToken}`,
                        },
                    }
                );

                if (userResponse.ok) {
                    const data = await userResponse.json();
                    return data;
                }
            }
        }

        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        return null;
    } catch (error) {
        console.error('Error fetching user data:', error);
        await addLogEntry({
            source: 'useFetchUserData',
            message: `'Error fetching:', ${error}`,
            context: '',
            code: 0,
        });
        return null;
    }
};

const useFetchUserData = () => {
    const [userData, setUserData] = useState<IUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);



    const fetchUserDataCallback = useCallback(
        async (accessToken: string | null, refreshToken: string | null) => {
            setIsLoading(true);
            const data = await fetchUserData(accessToken, refreshToken);

            if (data) {
                if ('user' in data) {
                    setUserData(data.user);
                } else {
                    setUserData(data);
                }
            } else {
                setUserData(null);
            }

            setIsLoading(false);
        },
        []
    );

    return { userData, isLoading, fetchUserData: fetchUserDataCallback };
};

export default useFetchUserData;
