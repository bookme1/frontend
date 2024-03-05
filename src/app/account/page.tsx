"use client";
import { BreadCrumbs } from "@/components/common/BreadCrumbs";
import { Header } from "@/components/common/Header";
import { LeftMenu } from "@/components/account/LeftMenu";

export default function Home() {
  return (
    <>
      <Header />
      <BreadCrumbs name="акаунт" />
      <LeftMenu />
    </>
  );
}
