"use client";
import { Categories } from "@/components/main/Categories";
import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header";
import { Hero } from "@/components/main/Hero";
import { SwiperList } from "@/components/main/SwiperList";
import { Loading } from "@/components/SERVICE_PAGES/Loading";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  useGetDataMutation,
  useGetUserBooksQuery,
  useGoogleAuthMutation,
  useRefreshTokenMutation,
} from "@/lib/redux/features/user/userApi";
import { BookType, loginOutputDTO } from "@/lib/redux/features/user/types";
import useUserLoginData from "@/components/common/Header/loginFunc";

export default function Home() {
  const { data: session, status: sessionStatus } = useSession();
  const [userData, setUserData] = useState<loginOutputDTO | null>(null);
  const [loading, setLoading] = useState(true); // Добавляем состояние загрузки
 

  // const [refreshTokens, { isLoading: refreshTokenIsLoading }] =
  //   useRefreshTokenMutation();

  // const [
  //   googleSignIn,
  //   {
  //     data: googleSignInData,
  //     isLoading: googleSignInLoading,
  //     error: googleError,
  //   },
  // ] = useGoogleAuthMutation();

  // const [
  //   getUserData,
  //   { data: wtfData, isLoading: getUserDataLoading, error: getDataError },
  // ] = useGetDataMutation();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       if (session && session.user?.email) {
  //         const { email, name } = session.user;
  //         if (name) await googleSignIn({ email, name });
  //       }
  //     } catch (error) {
  //       console.error("Error during Google Sign-In:", error);
  //     } finally {
  //       setLoading(false); // Устанавливаем loading в false после загрузки данных
  //     }
  //   };

  //   if (sessionStatus === "authenticated" && loading) {
  //     fetchData();
  //   }
  // }, [session, sessionStatus, googleSignIn, loading]); // Исправляем зависимости

  let token = localStorage.getItem("accessToken");
  if (!token) token = "1";
  const getBooks = useGetUserBooksQuery({
    accessToken: token,
    type: BookType.Fav,
  });

  // console.log("getBooks");
  // console.log(getBooks);
  useEffect(() => {
    getBooks;
  }, []);

  // const {
  //   userData: userLoginData,
  //   error,
  //   isLoading,
  // } = useUserLoginData(session);

  // useEffect(() => {
  //   console.log("user data");
  //   console.log(userLoginData);
  //   if (userLoginData) setUserData(userLoginData);
  // }, [userLoginData]);

  // let loadinggg;

  // useEffect(() => {
  //   if (
  //     refreshTokenIsLoading ||
  //     googleSignInLoading ||
  //     getUserDataLoading ||
  //     loading
  //   ) {
  //     loadinggg = true;
  //   } else {
  //     loadinggg = false;
  //   }
  // }, [refreshTokenIsLoading, googleSignInLoading, getUserDataLoading, loading]);

  // if (loadinggg) return <Loading />;

  // console.log(getBooks.data)

  // if (
  //   refreshTokenIsLoading ||
  //   googleSignInLoading ||
  //   getUserDataLoading ||
  //   loading
  // ) {
    // return <Loading />;
  // }
  // ###########
  // LOGIN LOGIC
  // ###########

  return (
    <>
      <Header />
      <Hero />
      <Categories />
      <SwiperList />
      <Footer />
    </>
  );
}
