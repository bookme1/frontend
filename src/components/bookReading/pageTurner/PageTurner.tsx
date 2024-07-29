import { Dispatch, FC, SetStateAction, useState } from 'react';

import { Container } from './PageTurner.styles';
import { ITheme } from '@/app/reading/[bookId]/page';
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
      <Container>
        {/* <button className="arrow">
					<Icon name="arrow_left" width={24} height={24} />
					<span className="turn">Назад</span>
				</button> */}
        <button className="page-number">
          <span className="short">стр.</span>{' '}
          <span className="full">Сторінка</span>
          {page}
          <Icon name="arrow_up" width={24} height={24} />
        </button>
        {filter && (
          <button className="filter" onClick={() => setShowModal(true)}>
            <Icon name="settings" width={24} height={24} />
          </button>
        )}
        {/* <button className="arrow">
					<span className="turn">Вперед</span>
					<Icon name="arrow_right" width={24} height={24} />
				</button> */}
      </Container>
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
