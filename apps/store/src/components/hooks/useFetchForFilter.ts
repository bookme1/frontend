import { useSearchParams } from 'next/navigation';

import { useGetFilterBooksQuery } from '../../lib/redux/features/book/bookApi';

export const useFetchForFilter = () => {
    const searchParams = useSearchParams();
    const q = decodeURIComponent(searchParams?.get('q') || '');
    const authors = decodeURIComponent(searchParams?.get('authors') || '');
    const minPrice = decodeURIComponent(searchParams?.get('minPrice') || '');
    const maxPrice = decodeURIComponent(searchParams?.get('maxPrice') || '');
    const publishers = decodeURIComponent(
        searchParams?.get('publishers') || ''
    );
    const languages = decodeURIComponent(searchParams?.get('languages') || '');
    const genre = decodeURIComponent(searchParams?.get('genre') || '');
    const page = decodeURIComponent(searchParams?.get('page') || '');

    const { data: filterBooks, isLoading } = useGetFilterBooksQuery({
        q,
        authors,
        minPrice,
        maxPrice,
        publishers,
        languages,
        genre,
        page,
    });

    return { filterBooks, isLoading };
};
