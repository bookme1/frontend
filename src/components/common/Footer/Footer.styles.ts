"use client";
import styled from "@emotion/styled";
import { Icon } from "../Icon";
import { Wrapper, visuallyHidden } from "@/styles/globals.styles";

export const FooterSection = styled.footer`
  padding-top: 80px;
  background-color: var(--beige);
`;

export const StyledWrapper = styled(Wrapper)`
  display: flex;
  flex-direction: column;
  gap: 48px;
  align-items: center;
  margin-bottom: 48px;
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    gap: 30px;
  }
  @media (min-width: 1280px) {
    padding-bottom: 128px;
    justify-content: space-between;
  }
`;

export const BottomContainer = styled(Wrapper)`
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

export const SocialLinksContainer = styled.ul`
  display: flex;
  gap: 23px;
  margin-bottom: 48px;
  justify-content: center;
`;

export const SocialLinkItem = styled.li`
  width: 40px;
  height: 40px;
  background-color: var(--red);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.15s cubic-bezier(0.17, 0.67, 0.83, 0.67);
  :hover {
    background-color: #e62e2e;
  }
  :active {
    background-color: #cc2929;
  }
`;

export const SocialLink = styled.a``;

export const TechLinksContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 24px;
  color: var(--gray);
  padding-bottom: 80px;
  align-items: center;
  @media (min-width: 768px) {
    flex-direction: row-reverse;
    gap: 99px;
    padding-top: 18px;
  }
  @media (min-width: 1280px) {
    gap: 203px;
  }
`;

export const TechLinkItem = styled.li`
  display: flex;
  justify-content: center;
`;

export const TechLink = styled.a`
  font-size: 16px;
`;

export const NavDescription = styled.h3`
  font-size: 28px;
  line-height: 120%;
  font-weight: 700;
  padding-bottom: 80px;
  @media (max-width: 767.5px) {
    ${visuallyHidden}
  }
`;

export const Logo = styled(Icon)`
  width: 178px !important;
  height: 40px !important;
`;
