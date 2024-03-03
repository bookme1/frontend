"use client";
import { Wrapper } from "@/styles/globals.styles";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Icon } from "../Icon";
import { CyrillicNames, regexExp } from "./BreadCrumbs.types";
import names from "./cyrillicNames.json";
import { Item, List } from "./BreadCrumbs.styles";

const Breadcrumbs = ({ name }: { name: string }) => {
  const cyrillicNames: CyrillicNames = names;
  const separator = <Icon name="arrow_right" />;
  const paths = usePathname();
  let pathNames: any;
  if (paths) {
    pathNames = paths.split("/").filter((path) => path);
  }
  const cyrillicPathNames = pathNames.map((path: string) => {
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

  const breadcrumbItems = cyrillicPathNames.map(
    (link: string | any[], index: number) => {
      const href = `/${pathNames.slice(0, index + 1).join("/")}`;
      const itemLink = link[0].toUpperCase() + link.slice(1, link.length);

      return renderLink(href, itemLink, index);
    }
  );
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
