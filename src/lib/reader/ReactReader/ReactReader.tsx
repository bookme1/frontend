import React, {
    type CSSProperties,
    type ReactNode,
    useRef,
    useState,
} from 'react';
import { type SwipeableProps, useSwipeable } from 'react-swipeable';

import { type NavItem } from 'epubjs';

// import { EpubView, type IEpubViewStyle, type IEpubViewProps } from '..'
import {
    type IReactReaderStyle,
    ReactReaderStyle as defaultStyles,
} from './style';
import { Icon } from '@/components/common/Icon';

import { EpubView, IEpubViewProps } from '../EpubView/EpubView';
import { IEpubViewStyle } from '../EpubView/style';

type SwipeWrapperProps = {
    children: ReactNode;
    swipeProps: Partial<SwipeableProps>;
};

const SwipeWrapper = ({ children, swipeProps }: SwipeWrapperProps) => {
    const handlers = useSwipeable(swipeProps);
    return <div {...handlers}>{children}</div>;
};

type TocItemProps = {
    data: NavItem;
    setLocation: (value: string) => void;
    styles?: CSSProperties;
};

const TocItem = ({ data, setLocation, styles }: TocItemProps) => (
    <div>
        <button onClick={() => setLocation(data.href)} style={styles}>
            {data.label}
        </button>
        {data.subitems && data.subitems.length > 0 && (
            <div style={{ paddingLeft: 10 }}>
                {data.subitems.map((item, i) => (
                    <TocItem
                        key={i}
                        data={item}
                        styles={styles}
                        setLocation={setLocation}
                    />
                ))}
            </div>
        )}
    </div>
);

export type IReactReaderProps = IEpubViewProps & {
    title?: string;
    showToc?: boolean;
    readerStyles?: IReactReaderStyle;
    epubViewStyles?: IEpubViewStyle;
    swipeable?: boolean;
};

type IReactReaderState = {
    isLoaded: boolean;
    expandedToc: boolean;
    toc: NavItem[];
};

export const ReactReader: React.FC<IReactReaderProps> = props => {
    const {
        title,
        showToc = true,
        loadingView,
        readerStyles = defaultStyles,
        locationChanged,
        swipeable,
        epubViewStyles,
        ...restProps
    } = props;

    const [isLoaded, setIsLoaded] = useState(false);
    const [expandedToc, setExpandedToc] = useState(false);
    const [toc, setToc] = useState<NavItem[]>([]);
    const readerRef = useRef<EpubView>(null);

    const toggleToc = () => {
        setExpandedToc(prev => !prev);
    };

    const next = () => {
        const node = readerRef.current;
        if (node && node.nextPage) {
            node.nextPage();
        }
    };

    const prev = () => {
        const node = readerRef.current;
        if (node && node.prevPage) {
            node.prevPage();
        }
    };

    const onTocChange = (toc: NavItem[]) => {
        const { tocChanged } = props;
        setToc(toc);
        if (tocChanged) tocChanged(toc);
    };

    const setLocation = (loc: string) => {
        const { locationChanged } = props;
        setExpandedToc(false);
        if (locationChanged) locationChanged(loc);
    };

    const renderToc = () => {
        return (
            <div>
                <div style={readerStyles.tocArea}>
                    <div style={readerStyles.toc}>
                        {toc.map((item, i) => (
                            <TocItem
                                data={item}
                                key={i}
                                setLocation={setLocation}
                                styles={readerStyles.tocAreaButton}
                            />
                        ))}
                    </div>
                </div>
                {expandedToc && (
                    <div
                        style={readerStyles.tocBackground}
                        onClick={toggleToc}
                    />
                )}
            </div>
        );
    };

    const renderTocToggle = () => {
        return (
            <button
                style={{
                    ...readerStyles.tocButton,
                    ...(expandedToc ? readerStyles.tocButtonExpanded : {}),
                }}
                onClick={toggleToc}
            >
                Зміст
                <span>
                    <Icon
                        name="arrow_down"
                        width={24}
                        height={24}
                        style={{
                            ...readerStyles.tocButtonIcon,
                            ...(expandedToc
                                ? readerStyles.tocButtonIconExpanded
                                : {}),
                        }}
                    />
                </span>
            </button>
        );
    };

    return (
        <div style={readerStyles.container}>
            <div
                style={{
                    ...readerStyles.readerArea,
                    ...(expandedToc ? readerStyles.containerExpanded : {}),
                }}
            >
                {showToc && renderTocToggle()}
                <div style={readerStyles.titleArea}>{title}</div>
                <SwipeWrapper
                    swipeProps={{
                        onSwipedRight: prev,
                        onSwipedLeft: next,
                        trackMouse: true,
                    }}
                >
                    <div style={readerStyles.reader}>
                        <EpubView
                            ref={readerRef}
                            loadingView={
                                loadingView === undefined ? (
                                    <div style={readerStyles.loadingView}>
                                        Loading…
                                    </div>
                                ) : (
                                    loadingView
                                )
                            }
                            epubViewStyles={epubViewStyles}
                            {...restProps}
                            tocChanged={onTocChange}
                            locationChanged={locationChanged}
                        />
                        {swipeable && <div style={readerStyles.swipeWrapper} />}
                    </div>
                </SwipeWrapper>
            </div>
            {showToc && toc && renderToc()}
            <button
                style={{ ...readerStyles.arrow, ...readerStyles.prev }}
                onClick={prev}
            >
                <Icon name="arrow_left" width={24} height={24} />
                <span>Назад</span>
            </button>
            <button
                style={{ ...readerStyles.arrow, ...readerStyles.next }}
                onClick={next}
            >
                Вперед
                <Icon name="arrow_right" width={24} height={24} />
            </button>
        </div>
    );
};
