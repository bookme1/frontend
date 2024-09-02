"use client";
import { Wrapper } from "@/styles/globals.styles";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Icon } from "../Icon";
import { CyrillicNames, regexExp } from "./BreadCrumbs.types";
import names from "./cyrillicNames.json";
import { Item, List, LastItem } from "./BreadCrumbs.styles";

const Breadcrumbs = ({ name }: { name: string }) => {
  const cyrillicNames: CyrillicNames = names;
  const separator = <Icon name="arrow_right" />;
  const paths = usePathname();
  const pathNames = paths?.split("/").filter((path) => path);

  const cyrillicPathNames = pathNames?.map((path: string) => {
    const matchedCyrillicName = cyrillicNames[path];
    const isUUID = regexExp.test(path);
    return matchedCyrillicName !== undefined
      ? matchedCyrillicName
      : isUUID
      ? name
      : path;
  }) || [];

  const renderLink = (href: string, itemLink: string, index: number) => (
    <React.Fragment key={index}>
      {index === cyrillicPathNames.length - 1 ? (
        <LastItem key={index}>
          <Link href={href}>{itemLink}</Link>
        </LastItem>
      ) : (
        <Item key={index}>
          <Link href={href}>{itemLink}</Link>
        </Item>
      )}
      {cyrillicPathNames?.length !== index + 1 && separator}
    </React.Fragment>
  );

  const breadcrumbItems = cyrillicPathNames?.map((link, index) => {
    const href = `/${pathNames?.slice(0, index + 1).join("/")}`;
    let itemLink: any;
    if (link && link.length) {
      itemLink = link[0].toUpperCase() + link.slice(1, link.length);
    }

    return renderLink(href, itemLink, index);
  });

  return (
    <Wrapper>
      <List>
        <Item>
          <Link href={"/"}>Головна</Link>
        </Item>
        {cyrillicPathNames && cyrillicPathNames.length > 0 && separator}
        {breadcrumbItems}
      </List>
    </Wrapper>
  );
};

export default Breadcrumbs;
