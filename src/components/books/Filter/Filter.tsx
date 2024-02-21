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
} from "./Filter.styles";
import { Icon } from "@/components/common/Icon";
import CustomCheckbox from "./check";

const Filter = ({ toggeModal }: any) => {
  const mockList = {
    id: [1, 2],
    books: ["E-Book", "Paper Book"],
    type: ["test", "test-1"],
    availability: ["true", "false"],
    author: ["John", "John-1"],
    language: ["en", "ukr"],
    pubHouse: ["test", "test-1"],
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
          {mockList.books.map((book) => (
            <CheckBox key={book.id}>
              <input type="checkbox" key={Math.random()} />

              <label>{book}</label>
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
          {mockList.type.map((book) => (
            <CheckBox key={book.id}>
              <input type="checkbox" key={Math.random()} />
              <Label>{book}</Label>
            </CheckBox>
          ))}
        </PartBox>

        <PartBox>
          <SubTitle>Наявність</SubTitle>
          {mockList.availability.map((book) => (
            <CheckBox key={book.id}>
              <input type="checkbox" key={Math.random()} />
              <Label>{book}</Label>
            </CheckBox>
          ))}
        </PartBox>

        <PartBox>
          <SubTitle>Наявність</SubTitle>
          <SearchInput type="input" placeholder="Знайти" />

          {mockList.author.map((book) => (
            <CheckBox key={book.id}>
              <input type="checkbox" key={Math.random()} />
              <Label>{book}</Label>
            </CheckBox>
          ))}
        </PartBox>

        <PartBox>
          <SubTitle>Мова</SubTitle>
          <SearchInput type="input" placeholder="Знайти" />

          {mockList.language.map((book) => (
            <CheckBox key={book.id}>
              <input type="checkbox" key={Math.random()} />
              <Label>{book}</Label>
            </CheckBox>
          ))}
        </PartBox>

        <PartBox>
          <SubTitle>Видавництво</SubTitle>
          <SearchInput type="input" placeholder="Знайти" />

          {mockList.pubHouse.map((book) => (
            <CheckBox key={book.id}>
              <input type="checkbox" key={Math.random()} />
              <Label>{book}</Label>
            </CheckBox>
          ))}
        </PartBox>
      </AsideContant>
    </AsideContainer>
  );
};

export default Filter;
