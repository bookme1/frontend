'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { Backdrop, Modal } from './Modal.styles';
import { Icon } from '@/components/common/Icon';

import { RangeSliderContainer } from '../rangeSlider/RangeSlider.container';

type Props = {
    onClose: () => void;
    isVisible: boolean;
};

export const ModalReading = ({ isVisible, onClose }: Props) => {
    const [fontSize, setFontSize] = useState(18);
    const [theme, setTheme] = useState('light');
    const [font, setFont] = useState('Raleway');

    const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        if (target && target.id === 'wrapper') {
            onClose();
        }
    };

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        },
        [onClose]
    );

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    useEffect(() => {
        if (isVisible) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
    }, [isVisible]);

    const onChange = (value: number) => {
        setFontSize(value);
    };

    const handleChangeTheme = (theme: string) => {
        setTheme(theme);
    };

    const handleChangeFont = (font: string) => {
        setFont(font);
    };

    if (!isVisible) return null;

    return (
        <Backdrop id="wrapper" onClick={handleClose}>
            <Modal>
                <button className="close-btn" onClick={() => onClose()}>
                    <Icon name="close_modal" size={32} />
                </button>
                <h3 className="title">Налаштування читання</h3>
                <div className="themes">
                    <p>Тема:</p>
                    <ul className="themes-list">
                        <li>
                            <button
                                className="theme-btn light"
                                onClick={() => handleChangeTheme('light')}
                            ></button>
                        </li>
                        <li>
                            <button
                                className="theme-btn dark"
                                onClick={() => handleChangeTheme('dark')}
                            ></button>
                        </li>
                        <li>
                            <button
                                className="theme-btn beige"
                                onClick={() => handleChangeTheme('beige')}
                            ></button>
                        </li>
                    </ul>
                </div>
                <div className="font-sizes">
                    <p className="font-size">Розмір шрифта: </p>
                    <RangeSliderContainer
                        min={12}
                        max={24}
                        onChange={onChange}
                        initialValue={18}
                        width={178}
                        withLabel
                    />
                </div>
                <div className="fonts">
                    <p>Шрифт:</p>

                    <ul className="fonts-list">
                        <li>
                            <button
                                className="raleway font-btn"
                                onClick={() => handleChangeFont('Raleway')}
                            >
                                Тт
                            </button>
                        </li>
                        <li>
                            <button
                                className="times-new-roman font-btn"
                                onClick={() =>
                                    handleChangeFont('Times New Roman')
                                }
                            >
                                Тт
                            </button>
                        </li>
                        <li>
                            <button
                                className="vivaldi font-btn"
                                onClick={() => handleChangeFont('Vivaldi')}
                            >
                                Тт
                            </button>
                        </li>
                    </ul>
                </div>
            </Modal>
        </Backdrop>
    );
};
