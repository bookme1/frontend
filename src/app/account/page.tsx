"use client";
import { BreadCrumbs } from "@/components/common/BreadCrumbs";
import { Header } from "@/components/common/Header";
import { Icon } from "@/components/common/Icon";
import { signOut } from "next-auth/react";
import { Favorite } from "@/components/Favorite";
import { useState } from "react";
import { LeftMenu } from "@/components/account/LeftMenu";
import { bookService } from "@/api/book/bookService";

export default function Home() {
  const [isFavVisible, setIsFavVisible] = useState(false);

  const handleFavClick = () => {
    setIsFavVisible(!isFavVisible);
  };

  const handlePayment = async () => {
    try {
      const response = await bookService.makeTestCheckout(100); // пример суммы
      console.log(response);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <>
      <div>
        <button onClick={handlePayment}>Pay</button>
        <div id="liqpay" style={{ display: "none" }}></div>
      </div>
      <Header />
      <button
        onClick={() => {
          bookService.updateBooksFromServer();
        }}
      >
        UPDATE
      </button>
      <BreadCrumbs name="акаунт" />
      <LeftMenu />
    </>
  );
}
