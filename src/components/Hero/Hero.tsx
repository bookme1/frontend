"use client";
import styled from "@emotion/styled";
import mobileHero from "@/assets/main/hero_mobile.webp";
import tabletHero from "@/assets/main/hero_tablet.webp";
import desktopHero from "@/assets/main/hero_desktop.webp";
import { Icon } from "../Icon";
import { Wrapper } from "@/styles/globals.styles";

const HeroSection = styled.section`
  margin-bottom: 132px;
`;

const HeroWrapper = styled(Wrapper)`
  @media (min-width: 768px) {
    display: flex;
    gap: 27px;
    padding-left: 20px;
    padding-right: 20px;
  }
  @media (min-width: 1280px) {
    gap: 30px;
    padding-left: 0;
    padding-right: 0;
  }
`;

export const visuallyHidden = `
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

const NavContainer = styled.nav`
  @media (max-width: 767.5px) {
    ${visuallyHidden}
  }
  width: 220px;
  padding-top: 24px;
  @media (min-width: 1280px) {
    width: 240px;
    padding-top: 40px;
  }
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const NavItem = styled.li`
  .accent {
    color: var(--red);
  }
`;

const NavLink = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  :hover {
    color: var(--red);
  }
  :hover .icon {
    transform: translateX(75%);
    color: var(--red);
    transition: transform 0.5s cubic-bezier(0.14, 0.77, 0.53, 0.99), color 0.1s;
  }
  @media (min-width: 1280px) {
    font-size: 18px;
  }
`;

const ImageContainer = styled.div`
  width: calc(100% - 32px);
  margin: 0 auto;
  height: 420px;
  background-image: url(${mobileHero.src});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 20px;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (min-width: 768px) {
    width: 100%;
    height: 438px;
    background-image: url(${tabletHero.src});
    display: block;
    padding-top: 54px;
    padding-left: 54px;
  }
  @media (min-width: 1280px) {
    height: 480px;
    background-image: url(${desktopHero.src});
    padding-top: 150px;
    padding-left: 80px;
  }
`;

const HeroTitle = styled.h1`
  margin-left: 30px;
  font-size: 32px;
  font-weight: 700;
  line-height: 140%;
  width: 50%;
  @media (min-width: 768px) {
    width: 100%;
    margin-left: 0;
    margin-bottom: 8px;
  }
  @media (min-width: 1280px) {
    font-size: 40px;
  }
`;

const HeroDescription = styled.p`
  @media (max-width: 767.5px) {
    ${visuallyHidden}
  }
  width: 302px;
  color: var(--gray);
  margin-bottom: 187px;
  @media (min-width: 1280px) {
    font-size: 20px;
    margin-bottom: 40px;
  }
`;

const CatalogButton = styled.button`
  width: 100%;
  height: 54px;
  background-color: var(--red);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  color: #fff;
  font-weight: 700;
  @media (min-width: 768px) {
    width: 163px;
    height: 46px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (min-width: 1280px) {
    font-size: 16px;
  }
`;

const NavIcon = styled(Icon)``;

const Hero = () => {
  return (
    <HeroSection>
      <HeroWrapper>
        <NavContainer>
          <NavList>
            <NavItem>
              <NavLink className="accent">Акції</NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                Блог Bookme <NavIcon name="arrow_right" className="icon" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                Блог Bookme <NavIcon name="arrow_right" className="icon" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                Паперові <NavIcon name="arrow_right" className="icon" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                Комплекти <NavIcon name="arrow_right" className="icon" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                Фантастика
                <NavIcon name="arrow_right" className="icon" />
              </NavLink>
            </NavItem>
          </NavList>
        </NavContainer>
        <ImageContainer>
          <HeroTitle>Українські книжки</HeroTitle>
          <HeroDescription>
            Книги, що змінюють світ, тепер доступні для всього світу!
          </HeroDescription>
          <CatalogButton>до каталогу</CatalogButton>
        </ImageContainer>
      </HeroWrapper>
    </HeroSection>
  );
};

export default Hero;
