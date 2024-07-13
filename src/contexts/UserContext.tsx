// contexts/UserContext.tsx
import { useSession } from 'next-auth/react';
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { loginOutputDTO } from '@/lib/redux/features/user/types';
import {
  useGetDataMutation,
  useGoogleAuthMutation,
  useRefreshTokenMutation,
} from '@/lib/redux/features/user/userApi';

interface UserContextProps {
  userData: loginOutputDTO | null;
  error: unknown;
  isLoading: boolean;
}

export const UserContext = createContext<UserContextProps | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  console.log(1);
  const [userData, setUserData] = useState<loginOutputDTO | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status: sessionStatus } = useSession();

  const [googleSignIn] = useGoogleAuthMutation();
  const [getUserData] = useGetDataMutation();
  const [refreshTokens] = useRefreshTokenMutation();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (session && session.user?.email) {
          const { email, name } = session.user;
          if (name) await googleSignIn({ email, name });
        }

        const storedAccessToken = localStorage.getItem('accessToken');
        const storedRefreshToken = localStorage.getItem('refreshToken');

        if (storedAccessToken) {
          const data = await getUserData(storedAccessToken).unwrap();
          setUserData(data);
        } else if (storedRefreshToken) {
          const refreshData = await refreshTokens(storedRefreshToken).unwrap();
          localStorage.setItem('accessToken', refreshData.tokens.accessToken);
          localStorage.setItem('refreshToken', refreshData.tokens.refreshToken);
          const data = await getUserData(
            refreshData.tokens.accessToken
          ).unwrap();
          setUserData(data);
        } else {
          setUserData(null);
        }
      } catch (err) {
        setError(err);
        setUserData(null);
        console.log('errored');
      } finally {
        setIsLoading(false);
      }
    };

    if (sessionStatus === 'authenticated') {
      fetchData();
    }
  }, [session, sessionStatus, googleSignIn, getUserData, refreshTokens]);

  useEffect(() => {
    if (userData && userData.tokens) {
      console.log('set tokens');
      localStorage.setItem('accessToken', userData.tokens.accessToken);
      localStorage.setItem('refreshToken', userData.tokens.refreshToken);
    }
  }, [userData]);
  const dataToReturn = (IUser)userData;
  return (
    <UserContext.Provider value={{ userData, error, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
