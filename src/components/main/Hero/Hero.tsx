import Image from 'next/image';

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
import desktopHero from '@/assets/main/hero_desktop.webp';
import mobileHero from '@/assets/main/hero_mobile.webp';
import tabletHero from '@/assets/main/hero_tablet.webp';

const Hero = () => {
    const getHeroImage = () => {
        const width = window.innerWidth;
        if (width < 480) return mobileHero.src;
        if (width < 769) return tabletHero.src;
        return desktopHero.src;
    };

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
                    <Image
                        src={getHeroImage()}
                        alt="Hero Image"
                        loading="eager"
                        fill
                        style={{
                            borderRadius: '20px',
                            objectFit: 'cover',
                        }}
                    />
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
