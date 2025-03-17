import { Dispatch, FC, SetStateAction, useState } from 'react';

import styles from './PageTurner.module.css';
import { ITheme } from '@/components/Pages/ReadingBookIdPage';
import { Icon } from '@/components/common/Icon';

import { ModalReading } from '../modal/Modal';

interface PageTurnerProps {
    filter?: boolean;
    page: number;
    fontSize: string;
    setFontSize: Dispatch<SetStateAction<string>>;
    fontFamily: string;
    setFontFamily: Dispatch<SetStateAction<string>>;
    theme: ITheme;
    setTheme: Dispatch<SetStateAction<ITheme>>;
}

const PageTurner: FC<PageTurnerProps> = ({
    filter,
    page,
    setTheme,
    theme,
    setFontFamily,
    fontFamily,
    setFontSize,
    fontSize,
}) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className={`wrapper ${styles.container}`}>
                {/* <button className={styles.arrow}>
					<Icon name={styles.arrowleft} width={24} height={24} />
					<span className={styles.turn}>Назад</span>
				</button> */}
                <button className={styles.pageNumber}>
                    <span className={styles.short}>стр.</span>{' '}
                    <span className={styles.full}>Сторінка</span>
                    {page}
                    <Icon name={styles.arrowUp} width={24} height={24} />
                </button>
                {filter && (
                    <button
                        className={styles.filter}
                        onClick={() => setShowModal(true)}
                    >
                        <Icon name={styles.settings} width={24} height={24} />
                    </button>
                )}
                {/* <button className={styles.arrow}>
					<span className={styles.turn}>Вперед</span>
					<Icon name={styles.arrowRight} width={24} height={24} />
				</button> */}
            </div>
            <ModalReading
                isVisible={showModal}
                onClose={() => setShowModal(false)}
                fontSize={fontSize}
                setFontSize={setFontSize}
                fontFamily={fontFamily}
                setFontFamily={setFontFamily}
                theme={theme}
                setTheme={setTheme}
            />
        </>
    );
};

export default PageTurner;
