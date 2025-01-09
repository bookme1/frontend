'use client';

import { useEffect, useRef, useState } from 'react';

import type { NavItem, Rendition } from 'epubjs';

import { BookContent } from '@/components/bookReading/bookContent/BookContent';
import BookHeader from '@/components/bookReading/bookReadingHeader/Header';
import PageTurner from '@/components/bookReading/pageTurner/PageTurner';
import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';
import { ReactReader } from '@/lib/reader';

import '../../../styles/fonts';

export type ITheme = 'light' | 'dark' | 'beige';

function updateTheme(rendition: Rendition, theme: ITheme) {
    const themes = rendition.themes;
    switch (theme) {
        case 'dark': {
            themes.override('color', '#fff');
            themes.override('background', '#1F171E');
            break;
        }
        case 'light': {
            themes.override('color', '#1F171E');
            themes.override('background', '#fff');
            break;
        }
        case 'beige': {
            themes.override('color', '#1F171E');
            themes.override('background', '#FFFBF5');
            break;
        }
    }
}

const updateFontFamily = (rendition: Rendition, fontFamily: string) => {
    const tags = [
        'p',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'div',
        'span',
        'a',
        'li',
        'ol',
    ];

    const fonts: { [key in typeof fontFamily]: string } = {
        raleway: 'Raleway, sans-serif !important',
        'times-new-roman': 'Times New Roman, serif !important',
        vivaldi: 'Vivaldi, cursive !important',
    };

    Object.keys(fonts).forEach(font => {
        const theme: { [key: string]: { 'font-family': string } } = {};
        tags.forEach(tag => {
            theme[tag] = { 'font-family': fonts[font] };
        });
        rendition.themes.register(font, theme);
        console.log(font);
    });

    rendition.themes.select(fontFamily);
};

export default function Home() {
    const [page, setPage] = useState<number>(0);
    const rendition = useRef<Rendition | undefined>(undefined);
    const toc = useRef<NavItem[]>([]);
    const [location, setLocation] = useState<string | number>(0);
    const [chapter, setChapter] = useState<string | undefined>();
    const [title, setTitle] = useState('');
    const [fontSize, setFontSize] = useState('18px');
    const [fontFamily, setFontFamily] = useState('raleway');
    const [theme, setTheme] = useState<ITheme>('light');
    const [totalPages, setTotalPages] = useState<number>(0);

    console.log(fontFamily);

    useEffect(() => {
        document.body.classList.add('for_light_theme');
        // document.body.classList.add('for_dark_theme');
        // document.body.classList.add('for_beige_theme');
    });

    useEffect(() => {
        if (rendition.current) {
            updateTheme(rendition.current, theme);
        }
    }, [theme]);

    useEffect(() => {
        rendition.current?.themes.fontSize(fontSize);
    }, [fontSize]);

    useEffect(() => {
        if (rendition.current) {
            updateFontFamily(rendition.current, fontFamily);
        }
    }, [fontFamily]);

    return (
        <>
            <Header />
            <BookHeader chapterName={chapter} bookTitle={title} />
            <BookContent>
                <ReactReader
                    url="https://s3.amazonaws.com/moby-dick/moby-dick.epub"
                    // url="/забуте-вбивство.epub"
                    // url="/чотири-кроки-до-прощення.epub"
                    location={location}
                    locationChanged={(loc: string) => {
                        setLocation(loc);
                        if (rendition.current && toc.current) {
                            const { displayed, href } =
                                rendition.current.location.start;
                            const chapter = toc.current.find(
                                item => item.href === href
                            );
                            setChapter(chapter ? chapter.label : ' '); //глава
                            setPage(displayed.page); // сторінка
                        }
                    }}
                    getRendition={(_rendition: Rendition) => {
                        rendition.current = _rendition;
                        updateFontFamily(rendition.current, fontFamily); //зміна шрифту
                        rendition.current.themes.fontSize(fontSize); //зміна розміру шрифта
                        rendition.current.book.loaded.metadata.then(
                            metadata => {
                                setTitle(metadata.title); //назва твору
                            }
                        );
                    }}
                />
                <PageTurner
                    filter
                    page={page}
                    fontSize={fontSize}
                    setFontSize={setFontSize}
                    fontFamily={fontFamily}
                    setFontFamily={setFontFamily}
                    theme={theme}
                    setTheme={setTheme}
                />
            </BookContent>
            <Footer />
        </>
    );
}
