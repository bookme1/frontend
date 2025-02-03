import { useSession } from 'next-auth/react';

import { useEffect, useState } from 'react';

import {
    useGetDataMutation,
    useGoogleAuthMutation,
} from '@/lib/redux/features/user/userApi';

// import useUserLoginData from '../common/Header/loginFunc';

const useAuthStatus = () => {
    const [userLoggedData, setUserLoggedData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    const [googleSignIn, { data }] = useGoogleAuthMutation();
    const { data: session, status: sessionStatus } = useSession();
    const [getData] = useGetDataMutation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (session && session.user?.email) {
                    const { email, name } = session.user;
                    if (name) await googleSignIn({ email, name });
                }
            } catch (error) {
                console.error('Error during Google Sign-In:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (sessionStatus === 'authenticated' && isLoading) {
            fetchData();
        }
    }, [session, sessionStatus, googleSignIn, isLoading]);

    useEffect(() => {
        if (data) {
            setUserLoggedData(data);
        }
    }, [data]);

    // const { userData } = usedat();

    // useEffect(() => {
    //     if (userData) {
    //         setUserLoggedData(userData);
    //     }
    // }, [userData]);

    return { userLoggedData, isLoading };
};

export default useAuthStatus;
