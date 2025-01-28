import AdminPage from '@/components/Pages/Admin/AdminPage';
import { fetchGetUserStatistic } from '@/contexts/fetchGetUserStatistic';
import { fetchUserData } from '@/contexts/fetchUserData';

export default async function Home() {
    const user = await fetchUserData();
    const userStatistic = await fetchGetUserStatistic();
    return <AdminPage user={user} userStatistic={userStatistic}/>;
}
