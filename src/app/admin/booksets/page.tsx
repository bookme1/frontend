import Booksets from '@/components/Pages/Admin/Booksets';
import { fetchGetUserStatistic } from '@/contexts/fetchGetUserStatistic';
import { fetchUserData } from '@/contexts/fetchUserData';

export default async function Home() {
    const user = await fetchUserData();
    const userStatistic = await fetchGetUserStatistic();
    return <Booksets user={user}  userStatistic={userStatistic}/>;
}
