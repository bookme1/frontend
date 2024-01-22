<<<<<<< Updated upstream
import { CardList } from "@/components/CardList";
=======
>>>>>>> Stashed changes
import { Categories } from "@/components/Categories";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SwiperList } from "@/components/SwiperList";
import Image from "next/image";

export default function Home() {
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
