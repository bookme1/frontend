"use client";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Icon } from "@/components/common/Icon";
export interface ICharacteristics {
  language: string;
  publish: string;
  pages: number;
  cover: string;
  description: string;
}

const CharContainer = styled.div`
  margin-bottom: 48px;
  @media (min-width: 768px) {
    border-radius: 20px;
    box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.25);
    padding: 32px 40px;
  }
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 32px;
`;

const CharList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 48px;
`;
const CharItem = styled.li`
  display: flex;
  gap: 24px;
  align-items: center;
  font-size: 18px;
`;
const CharKey = styled.span`
  color: var(--gray_dark);
`;

const CharValue = styled.span`
  font-weight: 700;
  font-variant-numeric: lining-nums proportional-nums;
  text-transform: capitalize;
`;
const FullButton = styled.button`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  padding: 12px 32px;
  border-radius: 8px;
  border: 1px solid var(--gray_dark);
  font-weight: 700;
  @media (min-width: 768px) {
    width: 332px;
  }
`;

const ControlButtons = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 24px;
`;

const ControlButton = styled.button`
  padding: 10px 0;
  text-align: center;
  background-color: var(--gray_border);
  border-radius: 8px;
  color: white;
  font-size: 20px;
  &.active {
    background-color: var(--red);
  }

  &.mobile {
    width: 163px;
    @media (min-width: 1280px) {
      width: max-content;
    }
  }

  &.quote {
    flex-grow: 1;
    @media (min-width: 1280px) {
      flex-grow: 0;
    }
  }

  @media (min-width: 1280px) {
    padding: 10px 16px;
  }
`;

const Description = styled.p`
  max-height: 95px;
  overflow: hidden;
  margin-bottom: 24px;
  transition: max-height 1s ease;

  &.full {
    max-height: 1000px;
  }

  @media (min-width: 1280px) {
    width: 596px;
  }
`;

const FullIcon = styled(Icon)`
  transition: transform 0.5s ease;
  &.full {
    transform: scaleY(-1);
  }
`;

const Characteristics: React.FC<{ characteristics: ICharacteristics }> = ({
  characteristics,
}) => {
  const [isFull, setIsFull] = useState(false);
  const [isDescFull, setIsDescFull] = useState(false);
  useEffect(() => {
    if (isDescFull == true) {
      document.querySelector(".description")?.classList.add("full");
      document.querySelector(".full_icon")?.classList.add("full");
    } else {
      document.querySelector(".description")?.classList.remove("full");
      document.querySelector(".full_icon")?.classList.remove("full");
    }
  }, [isDescFull]);
  useEffect(() => {
    if (isFull == true) {
      document.querySelector(".full_icon_char")?.classList.add("full");
    } else {
      document.querySelector(".full_icon_char")?.classList.remove("full");
    }
  }, [isFull]);

  return (
    <CharContainer>
      <Title>Характеристики</Title>
      <CharList>
        <CharItem>
          <CharKey>Мова:</CharKey>
          <CharValue>{characteristics.language}</CharValue>
        </CharItem>
        <CharItem>
          <CharKey>Видавництво</CharKey>
          <CharValue>{characteristics.publish}</CharValue>
        </CharItem>
        <CharItem>
          <CharKey>Кількість сторінок:</CharKey>
          <CharValue>{characteristics.pages}</CharValue>
        </CharItem>
        {isFull && (
          <CharItem>
            <CharKey>Обкладинка:</CharKey>
            <CharValue>{characteristics.cover}</CharValue>
          </CharItem>
        )}
        <FullButton
          onClick={() => {
            setIsFull((prev) => !prev);
          }}
        >
          {isFull ? "Сховати " : "Показати "}
          всі характеристики{" "}
          <FullIcon className="full_icon_char" name="arrow_down" />
        </FullButton>
      </CharList>
      <Title>Опис</Title>
      <ControlButtons>
        <ControlButton className="active mobile">Сюжет</ControlButton>
        <ControlButton className="mobile">Читати уривок</ControlButton>
        <ControlButton className="quote">Цитати з книги</ControlButton>
      </ControlButtons>
      <Description className="description">
        {characteristics.description}
      </Description>
      <FullButton
        onClick={() => {
          setIsDescFull((prev) => !prev);
        }}
      >
        {isDescFull ? "Сховати " : "Показати "}
        повний опис
        <FullIcon className="full_icon" name="arrow_down" />
      </FullButton>
    </CharContainer>
  );
};

export default Characteristics;
