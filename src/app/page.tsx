"use client";
import { Categories } from "@/components/main/Categories";
import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header";
import { Hero } from "@/components/main/Hero";
import { SwiperList } from "@/components/main/SwiperList";
import Image from "next/image";
import { useEffect } from "react";
import { fetchAllBooks, useDispatch, wrapper } from "@/lib/redux";
import { useSession } from "next-auth/react";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  const session = useSession();
  console.log(session);
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

