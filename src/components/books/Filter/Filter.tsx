"use client";
import React, { useEffect, useState } from "react";

import {
  AsideContainer,
  AsideContant,
  BackBtn,
  CheckBox,
  PartBox,
  SubTitle,
  Title,
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
import { useRouter, useSearchParams } from "next/navigation";

const Filter = ({ toggeModal }: any) => {
  const dispatch = useDispatch();

  const router = useRouter();

  const searchParams = useSearchParams();

  const book = searchParams ? searchParams.getAll("book") : "";
  const types = searchParams ? searchParams.getAll("types") : "";
  const availability = searchParams ? searchParams.getAll("availability") : "";
  const author = searchParams ? searchParams.getAll("author") : "";
  const language = searchParams ? searchParams.getAll("language") : "";
  const pubHouse = searchParams ? searchParams.getAll("pubHouse") : "";
  const priceFrom = searchParams ? searchParams.get("priceFrom") : "";
  const priceTo = searchParams ? searchParams.get("priceTo") : "";

  useEffect(() => {
    setSelectedFilters((prevState: any) => ({
      ...prevState,
      books: book,
      types: types,
      availability: availability,
      author: author,
      language: language,
      pubHouse: pubHouse,
      priceFrom: priceFrom,
      priceTo: priceTo,
    }));
    dispatch(AddFilter(selectedFilters));
  }, []);

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

  useEffect(() => {
    router.push(
      `?book=${selectedFilters.books.join(
        ","
      )}&types=${selectedFilters.types.join(
        ","
      )}&availability=${selectedFilters.availability.join(
        ","
      )}&author=${selectedFilters.author.join(
        ","
      )}&language=${selectedFilters.language.join(
        ","
      )}&pubHouse=${selectedFilters.pubHouse.join(",")}&priceFrom=${
        selectedFilters.priceFrom
      }&priceTo=${selectedFilters.priceTo}`
    );
  }, [
    router,
    selectedFilters.author,
    selectedFilters.availability,
    selectedFilters.books,
    selectedFilters.language,
    selectedFilters.priceFrom,
    selectedFilters.priceTo,
    selectedFilters.pubHouse,
    selectedFilters.types,
  ]);

  const toggleSelectedFilter = (
    filterName: keyof SelectedFiltersState,
    value: string
  ) => {
    setSelectedFilters((prevState) => {
      const currentFilters: any = prevState[filterName];
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
    setIsBtnVisible(true);
  };

  const handlePriceTo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFilters((prevState: any) => ({
      ...prevState,
      priceTo: event.target.value,
    }));
    setIsBtnVisible(true);
  };

  const handleApply = () => {
    dispatch(AddFilter(selectedFilters));
    // toggeModal(false);
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
                  checked={selectedFilters.books.includes(elem)}
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
              defaultValue={
                selectedFilters.priceFrom?.toString()
                  ? selectedFilters.priceFrom?.toString()
                  : ""
              }
              onInput={handlePriceFrom}
            />
            <RangeInput
              type="input"
              placeholder="до"
              defaultValue={
                selectedFilters.priceTo?.toString()
                  ? selectedFilters.priceTo?.toString()
                  : ""
              }
              onInput={handlePriceTo}
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
                  checked={selectedFilters.types.includes(elem)}
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
                  checked={selectedFilters.availability.includes(elem)}
                  onChange={() => toggleSelectedFilter("availability", elem)}
                />
                {elem}
              </label>
            </CheckBox>
          ))}
        </PartBox>

        <PartBox>
          <SubTitle>Автор</SubTitle>
          <SearchInput type="input" placeholder="Знайти" />

          {mockList.author.map((elem) => (
            <CheckBox key={elem}>
              <label>
                <InputStyled
                  type="checkbox"
                  checked={selectedFilters.author.includes(elem)}
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
                  checked={selectedFilters.language.includes(elem)}
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
                  checked={selectedFilters.pubHouse.includes(elem)}
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
