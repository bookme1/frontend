import styled from '@emotion/styled';

export const Title = styled.h2`
  text-align: center;
  font-size: 24px;
`;

export const PingList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Item = styled.li`
  border: 1px solid gray;
  padding: 4px;
  border-radius: 5px;
`;

export const ItemTitle = styled.p`
  color: green;

  &.error {
    color: red;
  }
`;

export const ItemData = styled.p``;
