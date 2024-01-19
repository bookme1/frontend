import { CardList } from "@/components/CardList";
import { Categories } from "@/components/Categories";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Categories />
      <CardList name="Популярне" />
      <CardList name="Рекомендуємо" />
      <CardList name="Новинки" />
      <Footer />
    </>
  );
}
