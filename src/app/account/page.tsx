"use client";
import { BreadCrumbs } from "@/components/common/BreadCrumbs";
import { Header } from "@/components/common/Header";
import { LeftMenu } from "@/components/account/LeftMenu";

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

