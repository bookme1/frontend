import {
  NavContainer,
  NavList,
  NavItem,
  NavLink,
  NavIcon,
  CatalogButton,
} from "../../main/Hero/Hero.styles";

import {
  FooterSection,
  StyledWrapper,
  Logo,
  NavDescription,
  BottomContainer,
  SocialLinksContainer,
  SocialLinkItem,
  SocialLink,
  TechLinksContainer,
  TechLinkItem,
  TechLink,
  CatalogButtonFooter,
  NavLinkFooter,
} from "./Footer.styles";
import { Icon } from "../Icon";

const Footer = () => {
  return (
    <FooterSection>
      <StyledWrapper>
        <div className="flex-col">
          <Logo name="logo_white" />
          <SocialLinksContainer className="mt-10">
            <SocialLinkItem>
              <SocialLink href="https://www.instagram.com/chervyak.ua/">
                <Icon name="instagram" />
              </SocialLink>
            </SocialLinkItem>
            <SocialLinkItem>
              <SocialLink href="https://www.instagram.com/chervyak.ua/">
                <Icon name="telegram" />
              </SocialLink>
            </SocialLinkItem>
          </SocialLinksContainer>
        </div>
        <NavContainer>
          <NavDescription>Каталог</NavDescription>

          <NavList>
            <div className="flex gap-40">
              <div>
                <NavItem className=" mb-5">
                  <NavLinkFooter className="accent footer">Акції</NavLinkFooter>
                </NavItem>
                <NavItem className="mb-5">
                  <NavLinkFooter className="footer w-max">
                    Магазин BookMe
                    <NavIcon name="arrow_right" className="icon" size={24} />
                  </NavLinkFooter>
                </NavItem>
                <NavItem className="">
                  <NavLinkFooter className="footer">
                    Дитячi
                    <NavIcon name="arrow_right" className="icon" size={24} />
                  </NavLinkFooter>
                </NavItem>
              </div>
              <div>
                <NavItem className="mb-5">
                  <NavLinkFooter className="footer">
                    Комплекти
                    <NavIcon name="arrow_right" className="icon" size={24} />
                  </NavLinkFooter>
                </NavItem>
                <NavItem className="mb-5">
                  <NavLinkFooter className="footer">
                    Блог{" "}
                    <NavIcon name="arrow_right" className="icon" size={24} />
                  </NavLinkFooter>
                </NavItem>
                <NavItem>
                  <NavLinkFooter className="footer w-max">
                    Доставка і оплата
                    <NavIcon name="arrow_right" className="icon" size={24} />
                  </NavLinkFooter>
                </NavItem>
              </div>
            </div>
          </NavList>
        </NavContainer>

        <CatalogButtonFooter className="footer">
          До каталогу
        </CatalogButtonFooter>
      </StyledWrapper>

      <BottomContainer className=" bg-gray-500 flex justify-center text-center items-center">
        <TechLinksContainer>
          <TechLinkItem className=" mr-44">
            <TechLink className=" text-white">Privacy</TechLink>
          </TechLinkItem>
          <TechLinkItem>
            <TechLink className=" text-white">Attribution</TechLink>
          </TechLinkItem>
          <TechLinkItem>
            <TechLink className=" text-white">©2024 — Copyright</TechLink>
          </TechLinkItem>
        </TechLinksContainer>
      </BottomContainer>
    </FooterSection>
  );
};

export default Footer;
