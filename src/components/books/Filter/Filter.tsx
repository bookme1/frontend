import React, { useState } from "react";

import {
  AsideContainer,
  AsideContant,
  BackBtn,
  CheckBox,
  PartBox,
  SubTitle,
  Title,
  OkBtn,
  PriceBox,
  RangeInput,
  SearchInput,
  PartBoxTitle,
  InputStyled,
  ApplyBtn,
} from "./Filter.styles";
import { Icon } from "@/components/common/Icon";
import { useDispatch } from "react-redux";
import { AddFilter } from "@/lib/redux";

const Filter = ({ toggeModal }: any) => {
  const dispatch = useDispatch();

  const [selectedFilters, setSelectedFilters] = useState<{
    books: string[];
    types: string[];
    availability: string[];
    author: string[];
    language: string[];
    pubHouse: string[];
    priceFrom: Number;
    priceTo: Number;
  }>({
    books: [],
    types: [],
    availability: [],
    author: [],
    language: [],
    pubHouse: [],
    priceFrom: 0,
    priceTo: 100000,
  });

  const [isBtnVisible, setIsBtnVisible] = useState(false);

  const mockList = {
    id: [1, 2],
    books: ["E-Book", "Paper Book"],
    type: ["test", "test-1"],
    availability: ["true", "false"],
    author: ["John", "John-1"],
    language: ["en", "ukr"],
    pubHouse: ["test", "test-1"],
  };

  type SelectedFiltersState = {
    books: string[];
    types: string[];
    availability: string[];
    author: string[];
    language: string[];
    pubHouse: string[];
    priceFrom: Number;
    priceTo: Number;
  };

  const toggleSelectedFilter = (
    filterName: keyof SelectedFiltersState,
    value: string
  ) => {
    setSelectedFilters((prevState) => {
      const currentFilters = prevState[filterName];
      const filterIndex = currentFilters.indexOf(value);
      if (filterIndex === -1) {
        return {
          ...prevState,
          [filterName]: [...currentFilters, value],
        };
      } else {
        return {
          ...prevState,
          [filterName]: currentFilters.filter(
            (filter: any) => filter !== value
          ),
        };
      }
    });
    setIsBtnVisible(true);
  };

  const handlePriceFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFilters((prevState: any) => ({
      ...prevState,
      priceFrom: event.target.value,
    }));
  };

  const handlePriceTo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFilters((prevState: any) => ({
      ...prevState,
      priceTo: event.target.value,
    }));
  };
 

  const handleApply = () => {
    dispatch(AddFilter(selectedFilters));
    toggeModal(false);
  };

  return (
    <AsideContainer>
      <AsideContant>
        {isBtnVisible && (
          <ApplyBtn onClick={handleApply}>Apply filters</ApplyBtn>
        )}
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
                  onChange={() => toggleSelectedFilter("books", elem)}
                />
                {elem}
              </label>
            </CheckBox>
          ))}
        </PartBox>

        <PartBox>
          <SubTitle>Ціна</SubTitle>
          <PriceBox>
            <RangeInput
              type="input"
              placeholder="від"
              onChange={handlePriceFrom}
            />
            <RangeInput
              type="input"
              placeholder="до"
              onChange={handlePriceTo}
            />

            {/* <OkBtn>Ok</OkBtn> */}
          </PriceBox>
        </PartBox>

        <PartBox>
          <SubTitle>Тип книги</SubTitle>
          {mockList.type.map((elem) => (
            <CheckBox key={elem}>
              <label>
                <InputStyled
                  type="checkbox"
                  onChange={() => toggleSelectedFilter("types", elem)}
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
                  onChange={() => toggleSelectedFilter("availability", elem)}
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
                  onChange={() => toggleSelectedFilter("author", elem)}
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
                  onChange={() => toggleSelectedFilter("language", elem)}
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
                  onChange={() => toggleSelectedFilter("pubHouse", elem)}
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
