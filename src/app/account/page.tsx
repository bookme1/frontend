import AccountPageFav from '@/components/Pages/AccountPageFav';
import { fetchAllOrderedBooks } from '@/contexts/fetchAllOrderedBooks';
import { fetchGetFavoritesQuantity } from '@/contexts/fetchGetFavoritesQuantity';
import { fetchUserData } from '@/contexts/fetchUserData';
import { BookType } from '@/lib/redux/features/user/types';

export default async function Home() {
    const user = await fetchUserData();
    const userOrderBooks = await fetchAllOrderedBooks();
    const favQuantity = await fetchGetFavoritesQuantity(BookType.Fav);

    return (
        <AccountPageFav
            user={user}
            userOrderBooks={userOrderBooks}
            favQuantity={favQuantity}
        />
    );
}
