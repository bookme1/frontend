"use client";
import { BreadCrumbs } from "@/components/common/BreadCrumbs";
import { Header } from "@/components/common/Header";
import { Icon } from "@/components/common/Icon";
import { signOut } from "next-auth/react";
import { Favorite } from "@/components/Favorite";
import { useState } from "react";
import { LeftMenu } from "@/components/account/LeftMenu";
import { useState } from "react";


export default function Home() {
  const [isFavVisible, setIsFavVisible] = useState(false);

  const handleFavClick = () => {
    setIsFavVisible(!isFavVisible);
  };

  return (
    <>
      <Header />
      <BreadCrumbs name="акаунт" />
      <LeftMenu />
    </>
  );
}
