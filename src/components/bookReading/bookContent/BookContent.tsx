import { ReactNode } from 'react';
import { ContentWrapper } from './BookContent.styles';


type Props = {
  children: ReactNode;
}

export const BookContent = ({ children }: Props) => {
  return <ContentWrapper>{children}</ContentWrapper>;
};
