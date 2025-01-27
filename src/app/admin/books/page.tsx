import BooksPage from '@/components/Pages/Admin/BooksPage';
import { fetchUserData } from '@/contexts/fetchUserData';

export default async function Home() {
    const user = await fetchUserData();
    return <BooksPage user={user} />;
}
