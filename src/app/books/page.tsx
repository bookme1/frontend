import BooksPage from '@/components/Pages/BooksPage';
import { fetchFilters } from '@/contexts/fetchFilters';
import { fetchGetFavoritesQuantity } from '@/contexts/fetchGetFavoritesQuantity';
import { fetchUserData } from '@/contexts/fetchUserData';
import { BookType } from '@/lib/redux/features/user/types';

export default async function Home() {
    const user = await fetchUserData();
    const filters = await fetchFilters('');
const favQuantity = await fetchGetFavoritesQuantity(BookType.Fav);
    return <BooksPage user={user} filtersData={filters} favQuantity={favQuantity}/>;
}
