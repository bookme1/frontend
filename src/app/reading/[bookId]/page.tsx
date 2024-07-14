'use client';

import { useEffect, useRef, useState } from 'react';
import {
  type IReactReaderStyle,
  ReactReader,
  ReactReaderStyle,
} from 'react-reader';

import type { Contents, NavItem, Rendition } from 'epubjs';

import { BookContent } from '@/components/bookReading/bookContent/BookContent';
import BookHeader from '@/components/bookReading/bookReadingHeader/Header';
import PageTurner from '@/components/bookReading/pageTurner/PageTurner';
import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';

type ITheme = 'light' | 'dark' | 'beige';
type FontFamily = 'default' | 'Times New Roman' | 'Vivaldi';



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
      themes.override('background', '#FFE6C0');
      break;
    }
  }
}

export default function Home() {
  const [page, setPage] = useState<number>(0);
  const rendition = useRef<Rendition | undefined>(undefined);
  const toc = useRef<NavItem[]>([]);
  const [location, setLocation] = useState<string | number>(0);
  const [chapter, setChapter] = useState<string | undefined>();
  const [title, setTitle] = useState('');
  const [fontSize, setFontSize] = useState('18px');
  const [theme, setTheme] = useState<ITheme>('light');

  useEffect(() => {
    document.body.classList.add('for_light_theme');
    // document.body.classList.add('for_dark_theme');
    // document.body.classList.add('for_beige_theme');
  });

  useEffect(() => {
    rendition.current?.themes.fontSize(fontSize);
  }, [fontSize]);

  useEffect(() => {
    if (rendition.current) {
      updateTheme(rendition.current, theme);
    }
  }, [theme]);

  return (
    <>
      <Header />
      <BookHeader chapterName={chapter} bookTitle={title} />
      <PageTurner filter page={page} />
      <BookContent>
        <button onClick={() => setFontSize('24px')} style={{ margin: '12px' }}>
          Change font-size
        </button>{' '}
        <button
          onClick={() => setTheme('light')}
          style={{ margin: '12px' }}
          // className={cx('btn', { underline: theme === 'light' })}
        >
          Light theme
        </button>{' '}
        <button
          onClick={() => setTheme('dark')}
          // className={cx('btn', { underline: theme === 'dark' })}
          style={{ margin: '12px' }}
        >
          Dark theme
        </button>{' '}
        <button
          onClick={() => setTheme('beige')}
          style={{ margin: '12px' }}
          // className={cx('btn', { underline: theme === 'dark' })}
        >
          Beige theme
        </button>
        <div>
        </div>
        <ReactReader
          url="/забуте-вбивство.epub"
          location={location}
          // loadingView="loading"
          tocChanged={_toc => {
            toc.current = _toc;
            // console.log(_toc)
          }}
          locationChanged={(loc: string) => {
            setLocation(loc);
            if (rendition.current && toc.current) {
              const { displayed, href } = rendition.current.location.start;
              const chapter = toc.current.find(item => item.href === href);
              setChapter(chapter ? chapter.label : ' ');
              setPage(displayed.page);
              // console.log(toc)
            }
          }}
          getRendition={(_rendition: Rendition) => {
            rendition.current = _rendition;
            // console.log(_rendition);
            rendition.current.themes.fontSize(fontSize);
            // console.log(rendition.current.themes);

            rendition.current.book.loaded.metadata.then(metadata => {
              // console.log(metadata)
              setTitle(metadata.title);
       
            });
          }}
        />
      </BookContent>
      <PageTurner page={page} />
      <Footer />
    </>
  );
}


// function updateFontFamily(rendition: Rendition, theme: FontFamily) {
//   const themes = rendition.themes;
//  switch (theme) {
//     case 'default': {
//       themes.override('font-family', 'Raleway');
//       break;
//     }
//     case 'Times New Roman': {
//       themes.override('font-family', 'Times New Roman');
//       break;
//     }
//     case 'Vivaldi': {
//       themes.override('font-family', 'Vivaldi');
//       break;
//     }
//   }
// }