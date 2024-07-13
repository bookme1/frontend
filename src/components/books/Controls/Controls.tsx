'use client';
import {
  BooksQuantity,
  CardContainer,
  Container,
  ControlButton,
  ControlsContainer,
  ItemContainer,
} from './Controls.styles';
import { Icon } from '@/components/common/Icon';
import usePagination from '@/components/hooks/usePagination';
import { useGetBooksQuery } from '@/lib/redux/features/book/bookApi';
import { Wrapper } from '@/styles/globals.styles';

import Filter from '../Filter/Filter';
import { MobileCard } from '../MobileCard';

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useSearchParams } from 'next/navigation';

  const getBooks = useGetBooksQuery('');
  useEffect(() => {
    getBooks;
  });

import {
    BooksQuantity,
    CardContainer,
    Container,
    ControlButton,
    ControlsContainer,
    ItemContainer,
} from './Controls.styles';
import { Loading } from '@/components/SERVICE_PAGES/Loading';
import { Icon } from '@/components/common/Icon';
import usePagination from '@/components/hooks/usePagination';
import { selectBooks } from '@/lib/redux';
import {
    useGetBooksQuery,
    useGetFilterBooksQuery,
    useGetFiltersQuery,
} from '@/lib/redux/features/book/bookApi';
import { Wrapper } from '@/styles/globals.styles';

import Filter from '../Filter/Filter';
import { MobileCard } from '../MobileCard';

const Controls = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const searchParams = useSearchParams();
    const authors = decodeURIComponent(searchParams?.get('authors') || '');
    const minPrice = decodeURIComponent(searchParams?.get('minPrice') || '');
    const maxPrice = decodeURIComponent(searchParams?.get('maxPrice') || '');
    const publishers = decodeURIComponent(
        searchParams?.get('publishers') || ''
    );
    const languages = decodeURIComponent(searchParams?.get('languages') || '');
    const { data: filterBooks, isLoading } = useGetFilterBooksQuery({
        authors,
        minPrice,
        maxPrice,
        publishers,
        languages,
    });
    const { data: filtersData, isLoading: loaderFilter } = useGetFiltersQuery('');

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggeModal = () => {
        setIsOpen(!isOpen);
    };


  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadMoreItems();
        }
      },
      {
        root: null,
        rootMargin: '20px',
        threshold: 1.0,
      }
    );
    const loader = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    loadMoreItems();
                }
            },
            {
                root: null,
                rootMargin: '20px',
                threshold: 1.0,
            }
        );

        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => {
            if (loader.current) {
                observer.unobserve(loader.current);
            }
        };
    }, [loadMoreItems]);

  const quantity = booksArr?.length;
  return (
    <>
      <Wrapper>
        <Container>
          {isOpen && <Filter toggeModal={toggeModal} />}
          <div>
            <BooksQuantity>{quantity} Товарів</BooksQuantity>
            <ControlsContainer>
              <ControlButton className="active" onClick={toggeModal}>
                <Icon name="filter" size={20} /> Фільтр{' '}
                <Icon name="arrow_down" color="#fff" size={16} />
              </ControlButton>
              <ControlButton>
                <Icon name="rating" size={20} /> За рейтингом
              </ControlButton>
            </ControlsContainer>
            <CardContainer>
              {paginatedItems.map((book: any) => {
                return (
                  <ItemContainer key={book.id}>
                    <MobileCard book={book} />
                  </ItemContainer>
                );
              })}
            </CardContainer>
            <div
              ref={loader}
              style={{ height: '100px', backgroundColor: 'transparent' }}
            />
          </div>
        </Container>
      </Wrapper>
    </>
  );
};

export default Controls;
