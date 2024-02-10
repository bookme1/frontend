import { Controls } from "@/components/books/Controls";
import { BreadCrumbs } from "@/components/common/BreadCrumbs";
import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header";

export default function Home() {
  return (
    <>
      <Header />
      <BreadCrumbs name="Каталог" />
      <Controls />
      <Footer />
    </>
  );
}
