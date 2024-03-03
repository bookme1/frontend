"use client";
import styled from "@emotion/styled";
import { Icon } from "@/components/common/Icon";

export const ReviewsContainer = styled.section`
  margin-bottom: 64px;
  @media (min-width: 768px) {
    box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    padding: 32px 20px;
  }
`;

export const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

export const ControlButton = styled.button`
  width: 163.5px;
  background-color: var(--gray_border);
  color: white;
  padding: 10px 0;
  border-radius: 8px;
  &.active {
    background-color: var(--red);
  }
`;

export const Review = styled.div`
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 768px) {
    width: 392px;
  }
`;

export const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const TopLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ReviewUsername = styled.p`
  font-size: 18px;
  font-weight: 700;
`;

export const ReviewDate = styled.p`
  font-variant-numeric: lining-nums proportional-nums;
  color: var(--gray_dark);
`;

export const GradeContainer = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const Grade = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Comment = styled.p`
  font-size: 18px;
  color: var(--gray_dark);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const GradeIcon = styled(Icon)`
  color: var(--gray_border);
  &.active {
    color: var(--red);
  }
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 32px;
`;
