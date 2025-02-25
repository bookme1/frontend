import Link from 'next/link';

import { BottomSection, Container, TopSection } from './Footer.styles';

import { Icon } from '../Icon';

const Footer = () => {
    const footer = {
        first: [
            { id: 1, label: 'Акції', link: '#' },
            { id: 2, label: 'Комплекти', link: '#' },
            { id: 3, label: 'Магазин BookMe', link: '#' },
        ],
        second: [
            { id: 1, label: 'Блог', link: 'https://t.me/bookmeua' },
            { id: 2, label: 'Дитячі', link: 'books?genre=Детские' },
            {
                id: 3,
                label: 'Умови використання сайту',
                link: 'conditions-of-use',
            },
        ],
    };
    return (
        <footer>
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
                                        <li key={text.id}>
                                            <Link href={text.link}>
                                                {text.label}
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
                                        <li key={text.id}>
                                            <Link href={text.link}>
                                                {text.label}
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
