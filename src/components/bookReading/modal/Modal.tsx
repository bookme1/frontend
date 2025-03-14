'use client';

import { Dispatch, SetStateAction, useEffect } from 'react';

import styles from './Modal.module.css';
import { ITheme } from '@/components/Pages/ReadingBookIdPage';
import { Icon } from '@/components/common/Icon';

import { RangeSliderContainer } from '../rangeSlider/RangeSlider.container';

type Props = {
    onClose: () => void;
    isVisible: boolean;
    fontSize: string;
    setFontSize: Dispatch<SetStateAction<string>>;
    fontFamily: string;
    setFontFamily: Dispatch<SetStateAction<string>>;
    theme: ITheme;
    setTheme: Dispatch<SetStateAction<ITheme>>;
};

export const ModalReading = ({
    isVisible,
    onClose,
    setTheme,
    theme,
    setFontFamily,
    fontFamily,
    setFontSize,
    fontSize,
}: Props) => {
    // const [fontSize, setFontSize] = useState(18);
    // const [theme, setTheme] = useState('light');
    // const [font, setFont] = useState('Raleway');

    const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        if (target && target.id === 'wrapper') {
            onClose();
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    });

    useEffect(() => {
        if (isVisible) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
    }, [isVisible]);

    useEffect(() => {
        // dispatch(fontSize)
    }, [fontSize]);

    const handleChangeFontSize = (value: string) => {
        setFontSize(value);
    };

    const handleChangeTheme = (theme: ITheme) => {
        setTheme(theme);
    };

    const handleChangeFontFamily = (font: string) => {
        setFontFamily(font);
    };

    if (!isVisible) return null;

    return (
        <div className={styles.backdrop} id="wrapper" onClick={handleClose}>
            <div className={styles.modal}>
                <button className={styles.closeBtn} onClick={() => onClose()}>
                    <Icon name="close_modal" size={32} />
                </button>
                <h3 className={styles.title}>Налаштування читання</h3>
                <div className={styles.themes}>
                    <p>Тема:</p>
                    <ul className={styles.themesList}>
                        <li>
                            <button
                                className={`${styles.themeBtn} ${styles.light}`}
                                onClick={() => handleChangeTheme('light')}
                            ></button>
                        </li>
                        <li>
                            <button
                                className={`${styles.themeBtn} ${styles.dark}`}
                                onClick={() => handleChangeTheme('dark')}
                            ></button>
                        </li>
                        <li>
                            <button
                                className={`${styles.themeBtn} ${styles.beige}`}
                                onClick={() => handleChangeTheme('beige')}
                            ></button>
                        </li>
                    </ul>
                </div>
                <div className={styles.fontSizes}>
                    <p className={styles.fontSize}>Розмір шрифта: </p>
                    <RangeSliderContainer
                        min={12}
                        max={24}
                        onChange={value =>
                            handleChangeFontSize(value.toString() + 'px')
                        }
                        initialValue={18}
                        width={178}
                        withLabel
                    />
                </div>
                <div className={styles.fonts}>
                    <p>Шрифт:</p>

                    <ul className={styles.fontsList}>
                        <li>
                            <button
                                className={`${styles.raleway} ${styles.fontBtn}`}
                                onClick={() =>
                                    handleChangeFontFamily('raleway')
                                }
                            >
                                Тт
                            </button>
                        </li>
                        <li>
                            <button
                                className={`${styles.timesNewRoman} ${styles.fontBtn}`}
                                onClick={() =>
                                    handleChangeFontFamily('times-new-roman')
                                }
                            >
                                Тт
                            </button>
                        </li>
                        <li>
                            <button
                                className={`${styles.vivaldi} ${styles.fontBtn}`}
                                onClick={() =>
                                    handleChangeFontFamily('vivaldi')
                                }
                            >
                                Tт
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
