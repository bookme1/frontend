import { IoMdHeartEmpty } from 'react-icons/io';

import { useSelector } from '../../../../lib/redux';
import { selectUserData } from '../../../../lib/redux/features/user/userSlice';
import styles from '../Header.module.css';

interface HeartIconProps {
    hasFavorites: boolean;
    favQuantity: number;
}

const HeartIcon = ({ hasFavorites, favQuantity }: HeartIconProps) => {
    return (
        <div
            className={`${styles.heartIcon} ${hasFavorites ? styles.favorited : styles.notFavorited}`}
        >
            <IoMdHeartEmpty size={28} />
            {hasFavorites && (
                <div className={styles.favoriteCount}>{favQuantity}</div>
            )}
        </div>
    );
};

const HeaderFavorites = () => {
    const user = useSelector(selectUserData);

    return (
        <div className={styles.headerBtn}>
            <a
                className={`${styles.accountLink}`}
                href={user ? '/account/favorites' : '/favorite'}
            >
                <HeartIcon
                    hasFavorites={!!user?.fav?.length}
                    favQuantity={user?.fav?.length || 0}
                />
                <p className={styles.text}>Обране</p>
            </a>
        </div>
    );
};

export default HeaderFavorites;
