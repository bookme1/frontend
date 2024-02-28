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
} from "./page.style";
import AvatarPhoto from "@/assets/account/UserAvatar.png";
import { Header } from "@/components/common/Header";
import { Icon } from "@/components/common/Icon";

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
        <ExitDiv>
          <Navli>
            <SpanStyle>
              <Icon name="exit" />
              Вийти{" "}
            </SpanStyle>
          </Navli>
        </ExitDiv>
      </WrapperStyle>
    </>
  );
}
