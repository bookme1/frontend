import { useCallback, useState } from 'react';

import {
    IUser,
    UserResponse,
    loginOutputDTO,
} from '@/lib/redux/features/user/types.ts';

// export interface loginOutputDTO {
//     user: IUser;
//     tokens: {
//         accessToken: string;
//         refreshToken: string;
//     };
// }

// export interface IUser {
//     id: number;
//     username: string | null;
//     email: string | null;
//     role: Role;
//     fav: string[];
//     cart: string[];
//     books: string[];
// }

// export enum Role {
//     User,
//     Moderator,
//     Admin,
// }

// type UserResponse = IUser | loginOutputDTO | null;

const fetchUserData = async (
    accessToken: string | null,
    refreshToken: string | null
): Promise<UserResponse> => {
    try {
        if (!accessToken && !refreshToken) {
            return null;
        }

        if (accessToken) {
            const response = await fetch(`/api/user`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                return data;
            }
        }

        if (refreshToken) {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/api/auth/refresh`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${refreshToken}`,
                    },
                }
            );

            if (response.ok) {
                const refreshData = await response.json();
                localStorage.setItem(
                    'accessToken',
                    refreshData.tokens.accessToken
                );
                localStorage.setItem(
                    'refreshToken',
                    refreshData.tokens.refreshToken
                );

                const userResponse = await fetch(`/api/user`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${refreshData.tokens.accessToken}`,
                    },
                });

                if (userResponse.ok) {
                    const data = await userResponse.json();
                    return data;
                }
            }
        }

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return null;
    } catch (error) {
        console.error('Error fetching user data:', error);
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
