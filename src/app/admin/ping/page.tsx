import PingPage from '@/components/Pages/Admin/PingPage';
import { fetchUserData } from '@/contexts/fetchUserData';

export default async function Home() {
    const user = await fetchUserData();
    return <PingPage user={user} />;
}
