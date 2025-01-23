import HomePage from '@/components/Pages/HomePage';
import { fetchBooksets } from '@/contexts/fetchBooksets';
import { fetchUserData } from '@/contexts/fetchUserData';

export default async function Home() {
    const user = await fetchUserData();
    const booksets = await fetchBooksets();

    return <HomePage user={user} booksets={booksets} />;
}
