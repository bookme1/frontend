import VeificationPage from '@/components/Pages/VeificationPage';
import { fetchUserData } from '@/contexts/fetchUserData';

export default async function Home() {
        const user = await fetchUserData();
    return <VeificationPage user={user} />;
}
