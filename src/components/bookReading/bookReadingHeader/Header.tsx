import styles from './Header.module.css';
import { Icon } from '@/components/common/Icon';

type Props = {
    chapterName: string | undefined;
    bookTitle: string;
};

export default function BookHeader({ chapterName, bookTitle }: Props) {
    return (
        <div className={`wrapper ${styles.headerWrapper}`}>
            <header className={styles.readingHeader}>
                <p className={styles.library}>Бібліотека</p>
                <Icon name="arrow_right" width={24} height={24} />
                <p className={styles.title}>{bookTitle}</p>
            </header>
            <div className={styles.chapter}>
                <h3>{chapterName}</h3>
            </div>
        </div>
    );
}
