import { IoCartOutline } from 'react-icons/io5';

import {
    closeAllModals,
    openModal,
    useDispatch,
    useSelector,
} from '@/lib/redux';
import { selectUserData } from '@/lib/redux/features/user/userSlice';

import styles from '../Header.module.css';

const HeaderBasket = () => {
    const dispatch = useDispatch();

    const handleCartModal = () => {
        dispatch(closeAllModals());
        dispatch(openModal('cart'));
    };

    const user = useSelector(selectUserData);
    return (
        <button
            className={`${styles.headerBtn} ${styles.text}`}
            onClick={handleCartModal}
        >
            <div
                className={`${styles.heartIcon} ${user?.cart ? styles.favorited : styles.notFavorited}`}
            >
                <IoCartOutline size="28" />

                {user && (
                    <div className={styles.favoriteCount}>
                        {user?.cart?.length || 0}
                    </div>
                )}
            </div>{' '}
            Кошик
        </button>
    );
};

export default HeaderBasket;
