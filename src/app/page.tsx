import HomePage from '@/components/Pages/HomePage';
import { fetchBooksets } from '@/contexts/fetchBooksets';
import { fetchGetFavoritesQuantity } from '@/contexts/fetchGetFavoritesQuantity';
import { fetchUserData } from '@/contexts/fetchUserData';
import { BookType } from '@/lib/redux/features/user/types';

export default async function Home() {
    const user = await fetchUserData();
    const booksets = await fetchBooksets();
    const favQuantity = await fetchGetFavoritesQuantity(BookType.Fav);

    return (
        <HomePage user={user} booksets={booksets} favQuantity={favQuantity} />
    );
}
