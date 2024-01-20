import {
  NavContainer,
  NavList,
  NavItem,
  NavLink,
  NavIcon,
  CatalogButton,
} from "../Hero/Hero.styles";

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
} from "./Footer.styles";
import { Icon } from "../Icon";

const Footer = () => {
  return (
    <FooterSection>
      <StyledWrapper>
        <Logo name="logo_white" />
        <NavContainer>
          <NavDescription>Каталог</NavDescription>
          <NavList>
            <NavItem>
              <NavLink className="accent footer">Акції</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="footer">
                Блог Bookme
                <NavIcon name="arrow_right" className="icon" size={24} />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="footer">
                Блог Bookme
                <NavIcon name="arrow_right" className="icon" size={24} />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="footer">
                Комплекти
                <NavIcon name="arrow_right" className="icon" size={24} />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="footer">
                Блог <NavIcon name="arrow_right" className="icon" size={24} />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="footer">
                Доставка і оплата
                <NavIcon name="arrow_right" className="icon" size={24} />
              </NavLink>
            </NavItem>
          </NavList>
        </NavContainer>
        <CatalogButton className="footer">до каталогу</CatalogButton>
      </StyledWrapper>
      <BottomContainer>
        <SocialLinksContainer>
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
        <TechLinksContainer>
          <TechLinkItem>
            <TechLink>Privacy</TechLink>
          </TechLinkItem>
          <TechLinkItem>
            <TechLink>Attribution</TechLink>
          </TechLinkItem>
          <TechLinkItem>
            <TechLink>©2024 — Copyright</TechLink>
          </TechLinkItem>
        </TechLinksContainer>
      </BottomContainer>
    </FooterSection>
  );
};

export default Footer;
