'use client';

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import { Backdrop, Modal } from './Modal.styles';
import { ITheme } from '@/app/reading/[bookId]/page';
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
  }, []);

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
            onChange={(value) => handleChangeFontSize(value.toString()+'px')}
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
                onClick={() => handleChangeFontFamily('raleway')}
              >
                Тт
              </button>
            </li>
            <li>
              <button
                className="times-new-roman font-btn"
                onClick={() => handleChangeFontFamily('times-new-roman')}
              >
                Тт
              </button>
            </li>
            <li>
              <button
                className="vivaldi font-btn"
                onClick={() => handleChangeFontFamily('vivaldi')}
              >
                Tт
              </button>
            </li>
          </ul>
        </div>
      </Modal>
    </Backdrop>
  );
};
