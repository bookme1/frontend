import Link from 'next/link';

import { BottomSection, Container, TopSection } from './Footer.styles';

import { Icon } from '../Icon';

const Footer = () => {
    const footer = {
        first: ['Акції', 'Комплекти', 'Магазин BookMe'],
        second: ['Блог', 'Дитячі', 'Умови використання сайту'],
    };
    return (
        <footer style={{}}>
            <TopSection>
                <Container>
                    <div className="links">
                        <Link href="#" aria-label="Перейти на головну сторінку">
                            <Icon name="logo_white" width={176} height={40} />
                        </Link>
                        <div>
                            <a
                                href="https://www.instagram.com/chervyak.ua/"
                                aria-label="Перейти на інстаграм сторінку"
                            >
                                <Icon name="instagram" />
                            </a>
                            <a
                                href="https://t.me/bookmeua"
                                aria-label="Перейти на телеграм сторінку"
                            >
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
                        <a
                            href="https://www.instagram.com/chervyak.ua/"
                            aria-label="Перейти на інстаграм сторінку"
                        >
                            <Icon name="instagram" />
                        </a>
                        <a
                            href="https://t.me/bookmeua"
                            aria-label="Перейти на телеграм сторінку"
                        >
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
