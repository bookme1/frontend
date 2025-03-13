import { useEffect, useState } from 'react';
import { FaBookReader } from 'react-icons/fa';
import { VscAccount } from 'react-icons/vsc';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import style from './LeftMenu.module.css';
import { deleteCookies } from '@/components/Cookie/Cookie';
import { Icon } from '@/components/common/Icon';
import { addLogEntry } from '@/contexts/Logs/fetchAddLog';
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
        <Link href={href} className={isActive ? style.active : ''}>
            {children}
        </Link>
    );
};

export default function LeftMenu({
    username = 'Гість',
    veryfied,
}: {
    username: string | null | undefined;
    veryfied: boolean | undefined | null;
}) {
    const [logOut, { isLoading, isError, error }] = useLogOutMutation();
    const router = useRouter();
    const handleLogout = async () => {
        try {
            await logOut().unwrap();
            console.log('Выход выполнен');
        } catch (error) {
            console.error('Ошибка выхода:', error);
            if (error) {
                addLogEntry({
                    source: 'Header.tsx useGetCartQuery()',
                    message: `'Ошибка выхода:: ${error}`,
                    context: '',
                    code: 0,
                });
            }
        }
    };

    const [isBlinking, setIsBlinking] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsBlinking(true); // Начать мигание
            setTimeout(() => {
                setIsBlinking(false); // Остановить мигание после 1.5 секунд (0.5с * 3 мигания)
            }, 1500); // 3 мигания по 0.5 секунды
        }, 10000); // Каждые 10 секунд

        // Очистка интервала при размонтировании компонента
        return () => clearInterval(interval);
    }, []);

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
                {/* <li className={style.item}>
                    <NavLink href="/account/wallet">
            <Icon name="wallet" /> Мій гаманець
          </NavLink>
                </li> */}
                {!veryfied && (
                    <li
                        className={`${style.item} ${isBlinking ? style.blinking : ''}`}
                    >
                        <NavLink href="/account/verification">
                            <Icon name="star" />
                            Веріфікація пошти
                        </NavLink>
                    </li>
                )}
            </ul>
            <li className={`${style.exit} ${style.item}`}>
                <NavLink href="/">
                    <button
                        onClick={() => {
                            handleLogout();
                            deleteCookies(['accessToken', 'refreshToken']);
                            router.push('/');
                        }}
                        className={style.logoutBtn}
                    >
                        <Icon name="exit" className="mr-2" />
                        Вийти
                    </button>
                </NavLink>
            </li>
        </div>
    );
}
