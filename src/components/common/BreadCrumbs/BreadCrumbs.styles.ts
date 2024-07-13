"use client";
import styled from "@emotion/styled";

export const List = styled.ul`
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const Item = styled.li`
  font-size: 16px;
`;

export const LastItem = styled(Item)`
  color: red;
`;
