import { AccountFav } from '@/components/Pages/AccountFav';
import { fetchGetFavorites } from '@/contexts/fetchGetFavorites';
import { fetchUserData } from '@/contexts/fetchUserData';
import { BookType } from '@/lib/redux/features/user/types';

export default async function Home() {
    const user = await fetchUserData();

    const favBooks = await fetchGetFavorites(BookType.Fav);
    
    return <AccountFav user={user} favBooks={favBooks} />;
}
