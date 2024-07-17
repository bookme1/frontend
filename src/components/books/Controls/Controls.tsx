'use client';

import { useEffect, useRef, useState } from 'react';

import { useSearchParams } from 'next/navigation';

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
import {
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
    const genres = decodeURIComponent(searchParams?.get('genre') || '');

    const { data: filterBooks, isLoading } = useGetFilterBooksQuery({
        authors,
        minPrice,
        maxPrice,
        publishers,
        languages,
        genres,
    });

    const { data: filtersData, isLoading: loaderFilter } =
        useGetFiltersQuery('');

    const loader = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleResize = () => {
            // Your resize logic here
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const loadMoreItems = () => {
            // Your load more items logic here
        };

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
    }, []);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const quantity = filterBooks?.length;

    return (
        <>
            {isLoading && loaderFilter ? (
                <Loading />
            ) : (
                <Wrapper>
                    <Container>
                        <Filter filtersData={filtersData} />
                        <div>
                            <BooksQuantity>{quantity} Товарів</BooksQuantity>
                            <ControlsContainer>
                                <ControlButton
                                    className="active"
                                    onClick={toggleModal}
                                >
                                    <Icon name="filter" size={20} /> Фільтр{' '}
                                    <Icon
                                        name="arrow_down"
                                        color="#fff"
                                        size={16}
                                    />
                                </ControlButton>
                                <ControlButton>
                                    <Icon name="rating" size={20} /> За
                                    рейтингом
                                </ControlButton>
                            </ControlsContainer>
                            <CardContainer>
                                {filterBooks &&
                                    filterBooks.map((book: any) => (
                                        <ItemContainer key={book.id}>
                                            <MobileCard book={book} />
                                        </ItemContainer>
                                    ))}
                            </CardContainer>
                            <div
                                ref={loader}
                                style={{
                                    height: '100px',
                                    backgroundColor: 'transparent',
                                }}
                            />
                        </div>
                    </Container>
                </Wrapper>
            )}
        </>
    );
};

export default Controls;
