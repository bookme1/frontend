import { FaBookReader } from 'react-icons/fa';
import { VscAccount } from 'react-icons/vsc';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import style from './LeftMenu.module.css';
import { deleteCookies } from '@/components/Cookie/Cookie';
import { Icon } from '@/components/common/Icon';
import { useLogOutMutation } from '@/lib/redux/features/user/userApi';

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
    const [logOut, { isLoading, isError }] = useLogOutMutation();
    const router = useRouter();
    const handleLogout = async () => {
        try {
            await logOut().unwrap();
            console.log('Выход выполнен');
        } catch (error) {
            console.error('Ошибка выхода:', error);
        }
    };

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
                <NavLink href="/">
                    <button
                        onClick={() => {
                            handleLogout();
                            deleteCookies(['accessToken', 'refreshToken']);
                            router.push('/');
                        }}
                        className="flex items-center"
                    >
                        <Icon name="exit" className="mr-2" />
                        Вийти
                    </button>
                </NavLink>
            </li>
        </div>
    );
}
