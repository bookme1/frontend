"use client";
import { Wrapper } from "@/styles/globals.styles";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Icon } from "../Icon";

import styled from "@emotion/styled";
import names from "./cyrillicNames.json";

const regexExp =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

const List = styled.ul`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const Item = styled.li`
  font-size: 16px;
`;

type CyrillicNames = {
  [key: string]: string;
};

const Breadcrumbs = ({ name }: { name: string }) => {
  const cyrillicNames: CyrillicNames = names;
  const separator = <Icon name="arrow_right" />;
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);
  const cyrillicPathNames = pathNames.map((path) => {
    const matchedCyrillicName = cyrillicNames[path];
    const isUUID = regexExp.test(path);
    return matchedCyrillicName !== undefined
      ? matchedCyrillicName
      : isUUID
      ? name
      : path;
  });
  const renderLink = (href: string, itemLink: string, index: number) => (
    <React.Fragment key={index}>
      <Item key={index}>
        <Link href={href}>{itemLink}</Link>
      </Item>
      {cyrillicPathNames.length !== index + 1 && separator}
    </React.Fragment>
  );

  const breadcrumbItems = cyrillicPathNames.map((link, index) => {
    const href = `/${pathNames.slice(0, index + 1).join("/")}`;
    const itemLink = link[0].toUpperCase() + link.slice(1, link.length);

    return renderLink(href, itemLink, index);
  });
  return (
    <Wrapper>
      <List>
        <Item>
          <Link href={"/"}>Головна</Link>
        </Item>
        {cyrillicPathNames.length > 0 && separator}
        {breadcrumbItems}
      </List>
    </Wrapper>
  );
};

export default Breadcrumbs;
