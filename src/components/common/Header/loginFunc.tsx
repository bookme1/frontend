import { useEffect, useState } from "react";
import {
  useGetDataMutation,
  useRefreshTokenMutation,
} from "@/lib/redux/features/user/userApi";

const useUserLoginData = (session: any) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [
    getUserData,
    {
      data: getUserDataData,
      error: getUserDataError,
      isLoading: getUserDataLoading,
    },
  ] = useGetDataMutation();

  const [
    refreshTokens,
    {
      data: refreshTokenData,
      error: refreshTokenError,
      isLoading: refreshTokenIsLoading,
    },
  ] = useRefreshTokenMutation();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        if (session) {
          console.log(1);
          setUserData(session.data);
        } else if (typeof localStorage !== "undefined") {
          console.log(2);
          const accessToken = localStorage.getItem("accessToken");
          const refreshToken = localStorage.getItem("refreshToken");

          if (accessToken) {
            console.log(3);
            await getUserData(accessToken)
              .unwrap()
              .then((data) => {
                console.log(4);
                setUserData(data);
              })
              .catch(async (error) => {
                console.log(5);
                if (refreshToken) {
                  await refreshTokens(refreshToken)
                    .unwrap()
                    .then(async (data) => {
                      console.log(6);
                      localStorage.setItem(
                        "accessToken",
                        data.tokens.accessToken
                      );
                      localStorage.setItem(
                        "refreshToken",
                        data.tokens.refreshToken
                      );
                      await getUserData(data.tokens.accessToken)
                        .unwrap()
                        .then((data) => {
                          setUserData(data);
                        })
                        .catch(() => {
                          setUserData(null);
                        });
                    })
                    .catch(() => {
                      setUserData(null);
                    });
                } else {
                  setUserData(null);
                }
              });
          } else if (refreshToken) {
            await refreshTokens(refreshToken)
              .unwrap()
              .then(async (data) => {
                console.log(7);
                localStorage.setItem("accessToken", data.tokens.accessToken);
                localStorage.setItem("refreshToken", data.tokens.refreshToken);
                await getUserData(data.tokens.accessToken)
                  .unwrap()
                  .then((data) => {
                    setUserData(data);
                  })
                  .catch(() => {
                    setUserData(null);
                  });
              })
              .catch(() => {
                setUserData(null);
              });
          } else {
            setUserData(null);
          }
        }
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [session, getUserData, refreshTokens]);

  return { userData, error, isLoading };
};

export default useUserLoginData;
