"use client";
import { Icon } from "@/components/common/Icon";
import { Wrapper } from "@/styles/globals.styles";
import styled from "@emotion/styled";
import { MobileCard } from "../MobileCard";

const BooksQuantity = styled.p`
  margin-top: 24px;
  margin-bottom: 20px;
  color: var(--gray);
  font-size: 20px;
  font-variant-numeric: lining-nums proportional-nums;
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const ControlButton = styled.button`
  background-color: var(--gray_border);
  color: white;
  padding: 10px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;

  &.active {
    background-color: var(--red);
  }
`;

const Controls = () => {
  const quantity = 18;
  return (
    <>
      <Wrapper>
        <BooksQuantity>{quantity} Товарів</BooksQuantity>
        <ControlsContainer>
          <ControlButton className="active">
            <Icon name="filter" size={20} /> Фільтр{" "}
            <Icon name="arrow_down" color="#fff" size={16} />
          </ControlButton>
          <ControlButton>
            <Icon name="rating" size={20} /> За рейтингом
          </ControlButton>
        </ControlsContainer>
      </Wrapper>
      <MobileCard />
      <MobileCard />
      <MobileCard />
      <MobileCard />
    </>
  );
};

export default Controls;
