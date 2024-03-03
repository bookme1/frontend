"use client";
import { Icon } from "@/components/common/Icon";
import { Wrapper } from "@/styles/globals.styles";
import { MobileCard } from "../MobileCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBooks, selectBooks } from "@/lib/redux";
import { useEffect, useState } from "react";
import Filter from "../Filter/Filter";
import {
  BooksQuantity,
  ControlButton,
  ControlsContainer,
  CardContainer,
  ItemContainer,
} from "./Controls.styles";
const Controls = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  const booksArr = useSelector(selectBooks);

  const [isOpen, setIsOpen] = useState(false);
  const toggeModal = () => {
    setIsOpen(!isOpen);
  };

  const quantity = booksArr.length;
  return (
    <>
      <Wrapper>
        <BooksQuantity>{quantity} Товарів</BooksQuantity>
        <ControlsContainer>
          <ControlButton className="active" onClick={toggeModal}>
            <Icon name="filter" size={20} /> Фільтр{" "}
            <Icon name="arrow_down" color="#fff" size={16} />
          </ControlButton>
          <ControlButton>
            <Icon name="rating" size={20} /> За рейтингом
          </ControlButton>
        </ControlsContainer>
        <CardContainer>
          {booksArr.map((book: any) => {
            return (
              <ItemContainer key={book.id}>
                <MobileCard book={book} />
              </ItemContainer>
            );
          })}
          {isOpen && <Filter toggeModal={toggeModal} />}
        </CardContainer>
      </Wrapper>
    </>
  );
};

export default Controls;
