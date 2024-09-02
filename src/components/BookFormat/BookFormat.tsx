import React from 'react';

import { FormatsContainer } from './BookFormat.styles';

import { Icon } from '../common/Icon';

const BookFormat = ({ size }: { size: number }) => {
  const renderBookFormatImage = (format: any) => {
    let imagePath;
    switch (format.toLowerCase()) {
      case 'epub':
        imagePath = 'epub';
        break;
      case 'mobi':
        imagePath = 'mobi';
        break;
      case 'pdf':
        imagePath = 'pdf';
        break;
      default:
        imagePath = 'default.png';
    }
    return (
      <Icon name={imagePath} data-format={format.toUpperCase()} size={size} />
    );
  };
  const bookFormats = ['PDF', 'EPUB', 'MOBI'];
  const renderedImages = bookFormats.map(format =>
    renderBookFormatImage(format)
  );
  return (
    <FormatsContainer className="formats-hover">
      {renderedImages}
    </FormatsContainer>
  );
};

export default BookFormat;
