import {
  HeroSection,
  HeroWrapper,
  NavContainer,
  NavList,
  NavItem,
  NavLink,
  NavIcon,
  ImageContainer,
  HeroTitle,
  HeroDescription,
  CatalogButton,
} from "./Hero.styles";

const Hero = () => {
  return (
    <HeroSection>
      <HeroWrapper>
        <NavContainer className="navigation">
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
          <CatalogButton>До каталогу</CatalogButton>
        </ImageContainer>
      </HeroWrapper>
    </HeroSection>
  );
};

export default Hero;
