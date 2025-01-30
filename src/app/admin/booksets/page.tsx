import Booksets from '@/components/Pages/Admin/Booksets';
import { fetchUserData } from '@/contexts/fetchUserData';

export default async function Home() {
    const user = await fetchUserData();

    return <Booksets user={user} />;
}
