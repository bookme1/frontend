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
  SpanStyle,
  UserList,
} from "./page.style";
import AvatarPhoto from "@/assets/account/UserAvatar.png";
import { Header } from "@/components/common/Header";
<<<<<<< Updated upstream
import { Icon } from "@/components/common/Icon";
import { signOut } from "next-auth/react";
import { Favorite } from "@/components/Favorite";
import { useState } from "react";

=======
import { LeftMenu } from "@/components/account/LeftMenu";
import { useState } from "react";
>>>>>>> Stashed changes

export default function Home() {
  const [isFavVisible, setIsFavVisible] = useState(false);

  const handleFavClick = () => {
    setIsFavVisible(!isFavVisible);
  };

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
          <UserList>
            <Navli>
              <SpanStyle>
                <Icon name="clock" />
                Мої покупки
              </SpanStyle>
            </Navli>

            <Navli onClick={handleFavClick}>
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
          </UserList>
          {isFavVisible && <Favorite />}
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

