'use client';

import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './BreadCrumbs.module.css';
import { CyrillicNames, regexExp } from './BreadCrumbs.types';
import names from './cyrillicNames.json';

import { Icon } from '../Icon';

const Breadcrumbs = ({ name }: { name: string }) => {
    const cyrillicNames: CyrillicNames = names;
    const separator = <Icon name="arrow_right" />;
    const paths = usePathname();
    const pathNames = paths?.split('/').filter(path => path);

    const cyrillicPathNames =
        pathNames?.map((path: string) => {
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
                <li className={`${styles.lastItem} ${styles.item}`} key={index}>
                    <Link href={href}>{itemLink}</Link>
                </li>
            ) : (
                <li className={styles.item} key={index}>
                    <Link href={href}>{itemLink}</Link>
                </li>
            )}
            {cyrillicPathNames?.length !== index + 1 && separator}
        </React.Fragment>
    );

    const breadcrumbItems = cyrillicPathNames?.map((link, index) => {
        const href = `/${pathNames?.slice(0, index + 1).join('/')}`;
        let itemLink: any;
        if (link && link.length) {
            itemLink = link[0].toUpperCase() + link.slice(1, link.length);
        }

        return renderLink(href, itemLink, index);
    });

    return (
        <div className={`wrapper`}>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <Link href={'/'}>Головна</Link>
                    {cyrillicPathNames &&
                        cyrillicPathNames.length > 0 &&
                        separator}
                </li>
                {breadcrumbItems}
            </ul>
        </div>
    );
};

export default Breadcrumbs;
