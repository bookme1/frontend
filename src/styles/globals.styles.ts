"use client";
import styled from "@emotion/styled";

export const Wrapper = styled.div`

    margin: 0 auto;
    padding: 0 10px;
    @media (min-width: 363px) {
        width: 363px;
    }
    @media (min-width: 748px) {
        width: 748px;
    }
    @media (min-width: 1234px) {
        width: 1234px;
    }
`;

export const visuallyHidden = `
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;
