import {
    CatalogButton,
    HeroDescription,
    HeroSection,
    HeroTitle,
    HeroWrapper,
    ImageContainer,
    NavContainer,
    NavIcon,
    NavItem,
    NavLink,
    NavList,
} from './Hero.styles';

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
                            <NavLink href="/books">
                                Каталог книжок
                                <NavIcon name="arrow_right" className="icon" />
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/conditions-of-use">
                                Умови використання
                                <NavIcon name="arrow_right" className="icon" />
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/books">
                                Кримінальні історії
                                <NavIcon name="arrow_right" className="icon" />
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/books">
                               Художня література <NavIcon name="arrow_right" className="icon" />
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/books">
                                Фантастика
                                <NavIcon name="arrow_right" className="icon" />
                            </NavLink>
                        </NavItem>
                    </NavList>
                </NavContainer>
                <ImageContainer>
                    <HeroTitle>Українські книжки</HeroTitle>
                    <HeroDescription>
                        Книги, що змінюють світ, тепер доступні для всього
                        світу!
                    </HeroDescription>
                    <CatalogButton href="/books">До каталогу</CatalogButton>
                </ImageContainer>
            </HeroWrapper>
        </HeroSection>
    );
};

export default Hero;
