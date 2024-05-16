import React from "react";
import { Icon } from "../common/Icon";

const Bookformat = ({ size }: { size: number }) => {
  const renderBookFormatImage = (format) => {
    let imagePath;
    switch (format.toLowerCase()) {
      case "epub":
        imagePath = "epub";
        break;
      case "mobi":
        imagePath = "mobi";
        break;
      case "pdf":
        imagePath = "pfg";
        break;
      default:
        imagePath = "default.png";
    }
    return <Icon name={imagePath} alt={format.toUpperCase()} size={size} />;
  };
  const bookFormats = ["EPUB", "MOBI", "PDF"];
  const renderedImages = bookFormats.map((format) =>
    renderBookFormatImage(format)
  );
  return <div> {renderedImages}</div>;
};

export default Bookformat;
