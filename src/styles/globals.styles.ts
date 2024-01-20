"use client";
import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 343px;
  margin: 0 auto;
  @media (min-width: 768px) {
    width: 728px;
  }

  @media (min-width: 1280px) {
    width: 1214px;
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
