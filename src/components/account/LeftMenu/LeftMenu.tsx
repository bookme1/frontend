"use client";

import {
  WrapperStyle,
  UserDiv,
  UserImg,
  UserName,
  NavDiv,
  Navli,
  ExitDiv,
  SpanStyle,
} from "./LeftMenu.styles";
import AvatarPhoto from "@/assets/account/UserAvatar.png";
import { Icon } from "@/components/common/Icon";
import { signOut } from "next-auth/react";

export default function LeftMenu() {
  return (
    <>
      <WrapperStyle>
        <UserDiv>
          <UserImg src={AvatarPhoto.src} alt="" />
          <UserName>Batman</UserName>
        </UserDiv>
        <NavDiv>
          <ul>
            <Navli>
              <SpanStyle>
                <Icon name="clock" />
                Мої покупки
              </SpanStyle>
            </Navli>

            <Navli>
              <SpanStyle>
                <Icon name="heart" />
                Обране
              </SpanStyle>
            </Navli>
            <Navli>
              <SpanStyle>
                <Icon name="wallet" /> Мій гаманець{" "}
              </SpanStyle>
            </Navli>
          </ul>
        </NavDiv>
        <ExitDiv className="">
          <Navli className="hover:text-red-500 transition-color duration-300 ease">
            <button
              onClick={() => {
                signOut();
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("accessToken");
              }}
              className="flex items-center"
            >
              <Icon name="exit" className="mr-2" />
              Вийти
            </button>
          </Navli>
        </ExitDiv>
      </WrapperStyle>
    </>
  );
}
