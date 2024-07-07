"use client"

import { Controls } from "@/components/books/Controls";
import { BreadCrumbs } from "@/components/common/BreadCrumbs";
import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header";
import SuccessInfo from "@/components/main/Modal/SuccessInfo/SuccessInfo";
import { useSelector } from "@/lib/redux";

export default function Home() {

  const modals = useSelector((state: any) => state.modals.modals);

  return (
    <>
      <Header />
      <BreadCrumbs name="Каталог" />
      <Controls />
      <Footer />
      <div id="modal-root"></div>
      {modals.successInfo.isOpen && <SuccessInfo />}
    </>
  );
}
