import BookUpdatePage from '@/components/Pages/Admin/BookUpdatePage';
import { fetchUserData } from '@/contexts/fetchUserData';

export default async function Home() {
    const user = await fetchUserData();

    return <BookUpdatePage user={user} />;
}
