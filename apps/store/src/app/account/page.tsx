import AccountPageFav from '../../components/Pages/AccountPageFav';
import { fetchAllOrderedBooks } from '../../contexts/fetchAllOrderedBooks';
import { fetchUserData } from '../../contexts/fetchUserData';

export default async function Home() {
    const user = await fetchUserData();
    const userOrderBooks = await fetchAllOrderedBooks();

    return <AccountPageFav user={user} userOrderBooks={userOrderBooks} />;
}
