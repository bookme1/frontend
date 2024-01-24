import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header";
import { BreadCrumbs } from "@/components/common/BreadCrumbs";
import { SliderLastBooks } from "@/components/book/SliderLastBooks";
import { MainInformation } from "@/components/book/MainInformation";
import { Characteristics } from "@/components/book/Characteristics";
import { Reviews } from "@/components/book/Reviews";

export default function Home() {
  return (
    <>
      <Header />
      <BreadCrumbs />
      <MainInformation />
      <Characteristics />
      <Reviews />
      <SliderLastBooks />
      <Footer />
    </>
  );
}
