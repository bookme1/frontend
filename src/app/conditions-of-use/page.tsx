import BooksConditionsOfUse from '@/components/Pages/BooksConditionsOfUse';
import { fetchGetFavoritesQuantity } from '@/contexts/fetchGetFavoritesQuantity';
import { fetchUserData } from '@/contexts/fetchUserData';
import { BookType } from '@/lib/redux/features/user/types';

export default async function Home() {
    const user = await fetchUserData();
    const favQuantity = await fetchGetFavoritesQuantity(BookType.Fav);
    return <BooksConditionsOfUse user={user} favQuantity={favQuantity}/>;
}
