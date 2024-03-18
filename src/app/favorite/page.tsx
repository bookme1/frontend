"use client";

import { Favorite } from "@/components/Favorite";
import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header";
import React from "react";
import { useDispatch } from "react-redux";

const page = () => {
  return (
    <>
      <Header />
      <Favorite />
      <Footer />
    </>
  );
};

export default page;
