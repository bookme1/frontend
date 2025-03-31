import ContentLoader from 'react-content-loader';
import { TfiPanel } from 'react-icons/tfi';

import { useUserSync } from '@/components/hooks/useUserAsync';
import {
    closeAllModals,
    openModal,
    useDispatch,
    useSelector,
} from '@/lib/redux';
import { Role } from '@/lib/redux/features/user/types';
import { selectUserData } from '@/lib/redux/features/user/userSlice';

import { Icon } from '../../Icon';
import { Avatar } from '../Header';
import styles from '../Header.module.css';

const HeaderAccount = () => {
    useUserSync();
    const user = useSelector(selectUserData);
    const dispatch = useDispatch();
    const isLoading = false;

    const handleModalSignIn = () => {
        dispatch(closeAllModals());
        dispatch(openModal('signIn'));
    };

    console.log('user', user);

    return (
        <>
            {' '}
            {isLoading ? (
                <ContentLoader
                    speed={2}
                    width={50}
                    height={50}
                    viewBox="0 0 50 50"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="0" y="35" rx="3" ry="3" width="50" height="15" />
                    <circle cx="25" cy="16" r="16" />
                </ContentLoader>
            ) : user ? (
                <Avatar>
                    <a className={styles.accountLink} href="/account"></a>
                </Avatar>
            ) : (
                <button
                    className={`${styles.headerBtn} ${styles.text}`}
                    onClick={() => {
                        handleModalSignIn();
                    }}
                >
                    <Icon name="account" size={28} />
                    Увійти
                </button>
            )}
            {(user?.role === Role.Moderator || user?.role === Role.Admin) && (
                <a href="/admin">
                    <TfiPanel size={40} color="#000" />
                </a>
            )}
        </>
    );
};

export default HeaderAccount;
