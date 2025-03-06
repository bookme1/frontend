import BooksPage from '@/components/Pages/BooksPage';
import { fetchFilters } from '@/contexts/fetchFilters';
import { fetchUserData } from '@/contexts/fetchUserData';

export default async function Home() {
    const filters = await fetchFilters('');
 const user = await fetchUserData();
    return <BooksPage filtersData={filters} user={user}/>;
}
