import HomePage from '@/components/Pages/HomePage';
import { fetchUserData } from '@/contexts/fetchUserData';

export default async function Home() {
    const user = await fetchUserData();

    return <HomePage user={user} />;
}
