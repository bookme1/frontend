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
  ControlsContainer,
  ControlButton,
  CardContainer,
  ItemContainer,
} from "./Controls.styles";

const Controls = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const booksArr = useSelector(selectBooks);

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  useEffect(() => {
    setIsOpen(window.innerWidth >= 1280);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 1280);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggeModal = () => {
    setIsOpen(!isOpen);
  };

  const quantity = booksArr.length;
  return (
    <>
      <Wrapper>
        <div style={{ display: "flex", gap: "16px" }}>
          {isOpen && <Filter toggeModal={toggeModal} />}
          <div>
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
            </CardContainer>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Controls;
