import { FaBookReader } from 'react-icons/fa';
import { VscAccount } from 'react-icons/vsc';

import Link from 'next/link';
import { usePathname } from 'next/navigation';


import style from './LeftMenu.module.css';
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
    isVerified,
}: {
    username: string | null | undefined;
    isVerified?: boolean | undefined | null;
}) {
    const [logOut, { isLoading, isError, error }] = useLogOutMutation();




    const handleLogout = async () => {
        try {
            await logOut().unwrap();
    
            // router.replace('/');
            window.location.replace('/');
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

    return (
        <div className={style.section}>
            <li className={`${style.account} ${style.item}`}>
                <VscAccount size={64} />
                <p className={style.userName}>{username}</p>
            </li>
            <ul className={style.list}>
                {isVerified && (
                    <>
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
                    </>
                )}

                {/* <li className={style.item}>
                    <NavLink href="/account/wallet">
                        <Icon name="wallet" /> Мій гаманець
                    </NavLink>
                </li> */}
            </ul>
            <li className={`${style.exit} ${style.item}`}>
                <NavLink href="/">
                    <button
                        onClick={() => handleLogout()}
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
