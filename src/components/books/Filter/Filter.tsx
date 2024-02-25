import React, { useState } from "react";

import {
  AsideContainer,
  AsideContant,
  BackBtn,
  CheckBox,
  Label,
  PartBox,
  SubTitle,
  Title,
  OkBtn,
  PriceBox,
  RangeInput,
  SearchInput,
  PartBoxTitle,
  InputStyled,
} from "./Filter.styles";
import { Icon } from "@/components/common/Icon";

const Filter = ({ toggeModal }: any) => {
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>(
    []
  );
  const [selectedAuthor, setSelectedAuthor] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string[]>([]);
  const [selectedPubHouse, setSelectedPubHouse] = useState<string[]>([]);

  const mockList = {
    id: [1, 2],
    books: ["E-Book", "Paper Book"],
    type: ["test", "test-1"],
    availability: ["true", "false"],
    author: ["John", "John-1"],
    language: ["en", "ukr"],
    pubHouse: ["test", "test-1"],
  };

  const handleBookChange = (book: string) => {
    setSelectedBooks((prev) =>
      prev.includes(book) ? prev.filter((a) => a !== book) : [...prev, book]
    );
  };

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((a) => a !== type) : [...prev, type]
    );
  };

  const handleAvailabilityChange = (availability: string) => {
    setSelectedAvailability((prev) =>
      prev.includes(availability)
        ? prev.filter((a) => a !== availability)
        : [...prev, availability]
    );
  };

  const handleAuthorChange = (author: string) => {
    setSelectedAuthor((prev) =>
      prev.includes(author)
        ? prev.filter((a) => a !== author)
        : [...prev, author]
    );
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage((prev) =>
      prev.includes(language)
        ? prev.filter((a) => a !== language)
        : [...prev, language]
    );
  };

  const handlePubHouseChange = (pubHouse: string) => {
    setSelectedPubHouse((prev) =>
      prev.includes(pubHouse)
        ? prev.filter((a) => a !== pubHouse)
        : [...prev, pubHouse]
    );
  };

  return (
    <AsideContainer>
      <AsideContant>
        <PartBoxTitle>
          <BackBtn onClick={() => toggeModal(false)}>
            <Icon name="arrow_left" color="#111" size={24} />
          </BackBtn>

          <Title>Фільтри</Title>
        </PartBoxTitle>

        <PartBox>
          <SubTitle>Книги</SubTitle>
          {mockList.books.map((elem) => (
            <CheckBox key={elem}>
              <label>
                <InputStyled
                  type="checkbox"
                  onChange={() => handleBookChange(elem)}
                />
                {elem}
              </label>
            </CheckBox>
          ))}
        </PartBox>

        <PartBox>
          <SubTitle>Ціна</SubTitle>
          <PriceBox>
            <RangeInput type="input" placeholder="від" />
            <RangeInput type="input" placeholder="до" />

            <OkBtn>Ok</OkBtn>
          </PriceBox>
        </PartBox>

        <PartBox>
          <SubTitle>Тип книги</SubTitle>
          {mockList.type.map((elem) => (
            <CheckBox key={elem}>
              <label>
                <InputStyled
                  type="checkbox"
                  onChange={() => handleTypeChange(elem)}
                />
                {elem}
              </label>
            </CheckBox>
          ))}
        </PartBox>

        <PartBox>
          <SubTitle>Наявність</SubTitle>
          {mockList.availability.map((elem) => (
            <CheckBox key={elem}>
              <label>
                <InputStyled
                  type="checkbox"
                  onChange={() => handleAvailabilityChange(elem)}
                />
                {elem}
              </label>
            </CheckBox>
          ))}
        </PartBox>

        <PartBox>
          <SubTitle>Наявність</SubTitle>
          <SearchInput type="input" placeholder="Знайти" />

          {mockList.author.map((elem) => (
            <CheckBox key={elem}>
              <label>
                <InputStyled
                  type="checkbox"
                  onChange={() => handleAuthorChange(elem)}
                />
                {elem}
              </label>
            </CheckBox>
          ))}
        </PartBox>

        <PartBox>
          <SubTitle>Мова</SubTitle>
          <SearchInput type="input" placeholder="Знайти" />

          {mockList.language.map((elem) => (
            <CheckBox key={elem}>
              <label>
                <InputStyled
                  type="checkbox"
                  onChange={() => handleLanguageChange(elem)}
                />
                {elem}
              </label>
            </CheckBox>
          ))}
        </PartBox>

        <PartBox>
          <SubTitle>Видавництво</SubTitle>
          <SearchInput type="input" placeholder="Знайти" />

          {mockList.pubHouse.map((elem) => (
            <CheckBox key={elem}>
              <label>
                <InputStyled
                  type="checkbox"
                  onChange={() => handlePubHouseChange(elem)}
                />
                {elem}
              </label>
            </CheckBox>
          ))}
        </PartBox>
      </AsideContant>
    </AsideContainer>
  );
};

export default Filter;
