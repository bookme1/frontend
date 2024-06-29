"use client";
import { Categories } from "@/components/main/Categories";
import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header";
import { Hero } from "@/components/main/Hero";
import { SwiperList } from "@/components/main/SwiperList";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchAllBooks, useDispatch } from "@/lib/redux";
import { useSession } from "next-auth/react";
import { Loading } from "@/components/SERVICE_PAGES/Loading";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  const session = useSession();
  console.log(session);
  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <Header />
          <Hero />
          <Categories />
          <SwiperList />
          <Footer />
        </>
      )}
    </>
  );
}
