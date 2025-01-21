import { useCallback, useState } from 'react';

import { IUser } from '@/lib/redux/features/user/types.ts';

// export interface loginOutputDTO {
//     user: IUser;
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

const fetchUserData = async (): Promise<IUser | null> => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL || ''}/api/user`,
            {
                method: 'GET',
                credentials: 'include', // Give cookies in request
            }
        );

        if (response.ok) {
            const data = await response.json();
            return data as IUser;
        }

        if (response.status === 401) {
            // If access token is expired, call refresh
            const refreshResponse = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL || ''}/api/auth/refresh`,
                {
                    method: 'POST',
                    credentials: 'include', // Take refresh with cookies
                }
            );

            if (refreshResponse.ok) {
                // After accessed update -> try to take user data
                const userResponse = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL || ''}/api/user`,
                    {
                        method: 'GET',
                        credentials: 'include', // cookies with updated tokens
                    }
                );

                if (userResponse.ok) {
                    const userData = await userResponse.json();
                    return userData as IUser;
                }
            }
        }

        return null; // If token updating didn't help
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
};

const useFetchUserData = () => {
    const [userData, setUserData] = useState<IUser | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchUserDataCallback = useCallback(async () => {
        setIsLoading(true);
        const data = await fetchUserData();

        if (data) {
            setUserData(data);
        } else {
            setUserData(null);
        }

        setIsLoading(false);
    }, []);

    return { userData, isLoading, fetchUserData: fetchUserDataCallback };
};

export default useFetchUserData;
