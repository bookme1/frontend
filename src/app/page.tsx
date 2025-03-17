import HomePage from '@/components/Pages/HomePage';
import { fetchBooksets } from '@/contexts/fetchBooksets';
import { fetchUserData } from '@/contexts/fetchUserData';

export default async function Home() {
    const booksets = await fetchBooksets();
    const user = await fetchUserData();

    return <HomePage booksets={booksets} user={user}/>;
}
