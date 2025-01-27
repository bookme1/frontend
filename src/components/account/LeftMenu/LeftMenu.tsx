import { signOut } from 'next-auth/react';
import { FaBookReader } from 'react-icons/fa';
import { VscAccount } from 'react-icons/vsc';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Item, List, Section, UserDiv, UserName } from './LeftMenu.styles';
import { deleteCookies } from '@/components/Cookie/Cookie';
import { Icon } from '@/components/common/Icon';

const NavLink = ({
    href = null,
    children = null,
}: {
    href: any;
    children: any;
}) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link href={href} className={isActive ? 'active' : ''}>
            {children}
        </Link>
    );
};

export default function LeftMenu({
    username = 'Гість',
}: {
    username: string | null | undefined;
}) {
    return (
        <Section>
            <Item className="account">
                <VscAccount size={64} />
                <UserName>{username}</UserName>
            </Item>
            <List>
                <Item>
                    <NavLink href="/account">
                        <FaBookReader />
                        Мої покупки
                    </NavLink>
                </Item>
                <Item>
                    <NavLink href="/account/favorites">
                        <Icon name="heart" />
                        Обране
                    </NavLink>
                </Item>
                <Item>
                    {/* <NavLink href="/account/wallet">
            <Icon name="wallet" /> Мій гаманець
          </NavLink> */}
                </Item>
            </List>
            <Item className="exit">
                <button
                    onClick={() => {
                        signOut();
                        deleteCookies(['accessToken', 'refreshToken']);
                    }}
                    className="flex items-center"
                >
                    <Icon name="exit" className="mr-2" />
                    Вийти
                </button>
            </Item>
        </Section>
    );
}
