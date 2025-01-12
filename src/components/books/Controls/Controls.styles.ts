"use client";
import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  gap: 16px;
`;

export const BooksQuantity = styled.p`
  padding-top: 32px;
  margin-bottom: 20px;
  color: var(--gray);
  font-size: 20px;
  font-variant-numeric: lining-nums proportional-nums;
`;

export const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

export const CardContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;

  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  @media (min-width: 1280px) {
    gap: 32px 16px;
  }
`;

export const ItemContainer = styled.li`
  max-width: 230px;
  @media (min-width: 1280px) {
    display: flex;
  }
`;

export const ControlButton = styled.button`
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
