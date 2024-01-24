"use client";

import styled from "@emotion/styled";
import { Wrapper, visuallyHidden } from "@/styles/globals.styles";
import { Icon } from "@/components/common/Icon";

const ImageContainer = styled.div`
  width: 250px;
  height: 330px;
  margin: 0 auto;
  margin-top: 32px;
  background-image: var(--background-image);
  background-position: center;
  background-size: cover;
  border-radius: 10px;
  margin-bottom: 32px;
  @media (min-width: 768px) {
    margin-top: 0;
    margin-left: 0;
  }
  @media (min-width: 1280px) {
    width: 502px;
    height: 660px;
  }
`;

const MainInfoContainer = styled.div`
  @media (min-width: 768px) {
    box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    padding: 32px 40px;
    width: 457px;
    height: 330px;
    @media (min-width: 1280px) {
      width: 676px;
      height: 358px;
      position: relative;
    }
  }
`;

const Title = styled.h1`
  font-size: 20px;
  margin-bottom: 24px;
  font-weight: 700;
  @media (min-width: 1280px) {
    font-size: 24px;
    width: 520px;
  }
`;

const AuthorsList = styled.ul`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 32px;
  @media (min-width: 768px) {
    margin-bottom: 24px;
  }
`;

const Author = styled.li`
  padding: 10px 16px;
  background-color: var(--gray_border);
  border-radius: 8px;
  color: white;
  font-size: 20px;
`;

const Price = styled.p`
  font-size: 32px;
  font-weight: 700;
  font-variant-numeric: lining-nums proportional-nums;
  margin-bottom: 32px;
  text-align: center;
  @media (min-width: 768px) {
    margin-bottom: 24px;
    text-align: left;
  }
  @media (min-width: 1280px) {
    font-size: 40px;
  }
`;

const Controls = styled.div`
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    gap: 16px;
  }
`;

const ToCart = styled.button`
  width: 100%;
  padding: 12px 32px;
  border-radius: 8px;
  background-color: var(--red);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  @media (min-width: 768px) {
    width: 177px;
    height: 48px;
  }
`;

const ToFavorite = styled.button`
  @media (max-width: 767.5px) {
    ${visuallyHidden};
  }
  padding: 10px;
  border-radius: 10px;
  background-color: var(--gray_border);
  color: white;
  @media (min-width: 1280px) {
    position: absolute;
    top: 32px;
    right: 40px;
    background-color: var(--red);
  }
`;

const StyledWrapper = styled(Wrapper)`
  @media (min-width: 768px) {
    display: flex;
    gap: 20px;
    margin-top: 35.5px;
  }
  @media (min-width: 768px) {
    gap: 40px;
    margin-top: 33.5px;
  }
`;

const MainInformation = () => {
  const mockBook = {
    name: "Усвідомленість. Як знайти гармонію в нашому шаленому світі",
    price: "290",
    authors: "Денні Пенман, Марк Вільямс",
    url: "https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/u/s/usvidomlenist-cover-1-728x1000.jpg",
    characteristics: {
      language: "Українська",
      publish: "Monolit Bizz",
      pages: 256,
      cover: "тверда",
    },
  };
  const getAuthorsMarkup = (authors: string) => {
    const authorsArr = authors.split(", ");
    return authorsArr.map((author) => {
      return <Author key={author}>{author}</Author>;
    });
  };
  const authorsMarkup = getAuthorsMarkup(mockBook.authors);
  return (
    <StyledWrapper>
      <ImageContainer
        style={{ ["--background-image" as string]: `url(${mockBook.url})` }}
      ></ImageContainer>
      <MainInfoContainer>
        <Title>{mockBook.name}</Title>
        <AuthorsList>{authorsMarkup}</AuthorsList>
        <Price>{mockBook.price} ₴</Price>
        <Controls>
          <ToCart>
            <Icon name="cart" size={28} />
            Придбати
          </ToCart>
          <ToFavorite>
            <Icon name="heart" size={28} />
          </ToFavorite>
        </Controls>
      </MainInfoContainer>
    </StyledWrapper>
  );
};

export default MainInformation;
