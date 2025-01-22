import dynamic from 'next/dynamic';

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
    //dynamic import of a client component
    const HeroImage = dynamic(() => import('./HeroImage/HeroImage'), {
        ssr: false,
    });

    return (
        <HeroSection>
            <HeroWrapper>
                <NavContainer className="navigation">
                    <NavList>
                        {/* <NavItem>
                            <NavLink className="accent">Акції</NavLink>
                        </NavItem> */}
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
                            <NavLink href="/books?genre=Кримінал">
                                Кримінальні історії
                                <NavIcon name="arrow_right" className="icon" />
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/books?genre=художня література">
                                Художня література
                                <NavIcon name="arrow_right" className="icon" />
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/books?genre=Фантастика">
                                Фантастика
                                <NavIcon name="arrow_right" className="icon" />
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/books?genre=Наука">
                                Наука
                                <NavIcon name="arrow_right" className="icon" />
                            </NavLink>
                        </NavItem>
                    </NavList>
                </NavContainer>
                <ImageContainer>
                    <HeroImage />
                    <HeroTitle>Українські книжки</HeroTitle>
                    <HeroDescription>
                        Книги, що змінюють світ, тепер доступні для всього
                        світу!
                    </HeroDescription>
                    <CatalogButton className="inSlider" href="/books">
                        До каталогу
                    </CatalogButton>
                </ImageContainer>
            </HeroWrapper>
        </HeroSection>
    );
};

export default Hero;
