"use client";
import { BreadCrumbs } from "@/components/common/BreadCrumbs";

import {
  WrapperStyle,
  UserDiv,
  UserImg,
  UserName,
  NavDiv,
  Navli,
  ExitDiv,
} from "./page.style";
import AvatarPhoto from "@/assets/account/UserAvatar.png";
import { Header } from "@/components/common/Header";
import { Icon } from "@/components/common/Icon";
import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <>
      <Header />
      <BreadCrumbs name="акаунт" />
      <WrapperStyle>
        <UserDiv>
          <UserImg src={AvatarPhoto.src} alt="" />
          <UserName>Batman</UserName>
        </UserDiv>
        <NavDiv>
          <ul>
            <Navli>
              <Icon name="clock" /> Мої покупки
            </Navli>

            <Navli>
              {" "}
              <Icon name="heart" />
              Обране
            </Navli>
            <Navli>
              {" "}
              <Icon name="wallet" /> Мій гаманець
            </Navli>
          </ul>
        </NavDiv>
        <ExitDiv>
          <Navli>
            <button
              onClick={() => {
                signOut();
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("accessToken");
              }}
            >
              <Icon name="exit" />
              Вийти
            </button>
          </Navli>
        </ExitDiv>
      </WrapperStyle>
    </>
  );
}
