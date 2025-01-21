import { signOut } from 'next-auth/react';
import { FaBookReader } from 'react-icons/fa';
import { VscAccount } from 'react-icons/vsc';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import style from './LeftMenu.module.css';
// import { Item, List, Section, UserDiv, UserName } from './LeftMenu.styles';
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
    username: string | null;
}) {
    return (
        <div className={style.section}>
            <li className={`${style.account} ${style.item}`}>
                <VscAccount size={64} />
                <p className={style.userName}>{username}</p>
            </li>
            <ul className={style.list}>
                <li className={style.item}>
                    <NavLink href="/account">
                        <FaBookReader />
                        Мої покупки
                    </NavLink>
                </li>
                <li className={style.item}>
                    <NavLink href="/account/favorites">
                        <Icon name="heart" />
                        Обране
                    </NavLink>
                </li>
                <li className={style.item}>
                    {/* <NavLink href="/account/wallet">
            <Icon name="wallet" /> Мій гаманець
          </NavLink> */}
                </li>
            </ul>
            <li className={`${style.exit} ${style.item}`}>
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
            </li>
        </div>
    );
}
