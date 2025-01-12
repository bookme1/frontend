import { HeaderWrapper } from './Header.styles';
import { Icon } from '@/components/common/Icon';

type Props = {
  chapterName: string | undefined;
  bookTitle: string;
};

export default function BookHeader({ chapterName, bookTitle }: Props) {
  return (
    <HeaderWrapper>
      <header className="reading-header">
        <p className="library">Бібліотека</p>
        <Icon name="arrow_right" width={24} height={24} />
        <p className="title">{bookTitle}</p>
      </header>
      <div className="chapter">
        <h3>{chapterName}</h3>
      </div>
    </HeaderWrapper>
  );
}
