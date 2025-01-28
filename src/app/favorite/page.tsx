import FavoritePage from '@/components/Pages/FavoritePage';
import { fetchGetFavorites } from '@/contexts/fetchGetFavorites';
import { fetchGetFavoritesQuantity } from '@/contexts/fetchGetFavoritesQuantity';
import { fetchUserData } from '@/contexts/fetchUserData';
import { BookType } from '@/lib/redux/features/user/types';

export default async function Home() {
    const user = await fetchUserData();
    const favQuantity = await fetchGetFavoritesQuantity(BookType.Fav);
    const favBooks = await fetchGetFavorites(BookType.Fav);
    return <FavoritePage user={user} favQuantity={favQuantity} favBooks={favBooks} />;
}
