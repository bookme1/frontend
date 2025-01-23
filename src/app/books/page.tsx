import BooksPage from '@/components/Pages/BooksPage';
import { fetchFilters } from '@/contexts/fetchFilters';
import { fetchUserData } from '@/contexts/fetchUserData';

export default async function Home() {
    const user = await fetchUserData();
    const filters = await fetchFilters('');
    return (
        <>
            <BooksPage user={user} filtersData={filters} />
        </>
    );
}
