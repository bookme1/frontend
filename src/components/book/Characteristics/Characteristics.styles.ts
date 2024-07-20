"use client";
import styled from "@emotion/styled";
import { Icon } from "@/components/common/Icon";

export const CharContainer = styled.div`
  margin-bottom: 48px;
  @media (min-width: 768px) {
    border-radius: 20px;
    box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.25);
    padding: 32px 40px;
  }
`;

export const Title = styled.h2`
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 32px;
`;

export const CharList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 48px;
`;

export const CharItem = styled.li`
  display: flex;
  gap: 24px;
  align-items: center;
  font-size: 18px;
`;

export const CharKey = styled.span`
  color: var(--gray_dark);
`;

export const CharValue = styled.span`
  font-weight: 700;
  font-variant-numeric: lining-nums proportional-nums;
  text-transform: capitalize;
`;

export const FullButton = styled.button`
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

export const ControlButtons = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 24px;
`;

export const ControlButton = styled.button`  
  padding: 10px 0;
  text-align: center;
  background-color: var(--gray_border);
  border-radius: 8px;
  color: white;
  font-size: 20px;
  position: relative; /* Added for the strike-through line */
  flex: 1;
  max-width: 163px; /* Ensure the buttons have a max-width */
  white-space: nowrap; /* Prevent text from wrapping */

  &.active {
    background-color: var(--red);
  } 

  &.disabled {
    border-color: #9f9f9f;
    background-color: #9f9f9f;
    color: #ececec;
    cursor: not-allowed; /* Optional: To indicate it's not clickable */
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 30%;
      width: 50%;
      height: 2px;
      background-color: red;
      transform: rotate(-45deg);
      transform-origin: center;
    }
  }

  &.mobile {    
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

export const Description = styled.p`
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

export const FullIcon = styled(Icon)`
  transition: transform 0.5s ease;
  &.full {
    transform: scaleY(-1);
  }
`;
