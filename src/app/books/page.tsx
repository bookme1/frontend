import BooksPage from '@/components/Pages/BooksPage';
import { fetchFilters } from '@/contexts/fetchFilters';

export default async function Home() {
    const filters = await fetchFilters('');

    return <BooksPage filtersData={filters} />;
}
