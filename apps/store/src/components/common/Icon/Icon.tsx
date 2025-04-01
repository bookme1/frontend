import { CSSProperties, MouseEvent } from 'react';

import classnames from 'classnames';

import styles from './Icon.module.css';

type Props = {
    name: string;
    className?: string;
    size?: string | number;
    height?: string | number;
    width?: string | number;
    style?: CSSProperties;
    onClick?: (e: MouseEvent<SVGElement>) => void;
    id?: string;
    color?: string;
};

const Icon = ({
    name,
    size,
    height,
    className,
    width,
    style,
    onClick,
    id,
    color,
}: Props) => {
    const vSize = size ? `${size}px` : '20px';
    const vHeight = `${height}px`;
    const vWidth = `${width}px`;

    return (
        <svg
            className={`${classnames(styles.className, 'c-icon')} ${styles.svg}`}
            style={{
                ...style,
                width: width ? vWidth : vSize,
                height: height ? vHeight : vSize,
                color: color || undefined,
            }}
            onClick={onClick}
            id={id}
        >
            <use xlinkHref={`#${name}`} id={id} />
        </svg>
    );
};

export default Icon;
