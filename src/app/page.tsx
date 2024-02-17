"use client";
import { Categories } from "@/components/main/Categories";
import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header";
import { Hero } from "@/components/main/Hero";
import { SwiperList } from "@/components/main/SwiperList";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { fetchAllBooks } from "@/lib/redux";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

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
