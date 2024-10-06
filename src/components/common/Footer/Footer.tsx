import Link from 'next/link';

import { BottomSection, Container, TopSection } from './Footer.styles';

import { Icon } from '../Icon';

const Footer = () => {
    const footer = {
        first: ['Акції', 'Комплекти', 'Магазин BookMe'],
        second: ['Блог', 'Дитячі', 'Умови використання сайту'],
    };
    return (
        <footer>
            <TopSection>
                <Container>
                    <div className="links">
                        <Link href="#"  aria-label='Link to home page'>
                            <Icon name="logo_white" width={176} height={40} />
                        </Link>
                        <div>
                            <a href="#" aria-label="Link to Instagram">
                                <Icon name="instagram" />
                            </a>
                            <a href="#" aria-label="Link to Telegram">
                                <Icon name="telegram" />
                            </a>
                        </div>
                    </div>
                    <div className="navigation">
                        <h3>Каталог</h3>
                        <div>
                            <ul>
                                {footer.first.map(text => {
                                    return (
                                        <li key={text}>
                                            <Link href="conditions-of-use">
                                                {text}
                                                <Icon
                                                    name="arrow_right"
                                                    width={24}
                                                />
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                            <ul>
                                {footer.second.map(text => {
                                    return (
                                        <li key={text}>
                                            <Link href="#">
                                                {text}
                                                <Icon
                                                    name="arrow_right"
                                                    width={24}
                                                />
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="mobile__navigation">
                        <a href="/" aria-label='Link to instagram'>
                            <Icon name="instagram" />
                        </a>
                        <a href="/" aria-label='Link to telegram'>
                            <Icon name="telegram" />
                        </a>
                    </div>
                </Container>
            </TopSection>
            <BottomSection>
                <Container>
                    <ul>
                        <li>Attribution</li>
                        <li>©2023— Copyright</li>
                        <li>Privacy</li>
                    </ul>
                </Container>
            </BottomSection>
        </footer>
    );
};

export default Footer;
