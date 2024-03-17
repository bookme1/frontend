"use client";
import React from "react";
import { LogoContainer, UserImgStyle } from "./Headerstatistics.style";
import Link from "next/link";
import { Logo } from "../common/Header/Header.styles";

import AvatarPhoto from "@/assets/account/UserAvatar.png";
import { Icon } from "../common/Icon";

const Headerstatistics = () => {
  return (
    <>
      <div>
        <LogoContainer className="flex items-center shadow-xl h-20">
          <Link href="/" className="ml-20">
            <Logo name="logo_black" />
          </Link>
          <div className="flex items-center gap-10">
            <p>Bruce</p>
            <UserImgStyle src={AvatarPhoto.src} alt="" />
            <Icon name="exit" className="mr-2" />
          </div>
        </LogoContainer>
      </div>
    </>
  );
};

export default Headerstatistics;
