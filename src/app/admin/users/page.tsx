import UserPage from '@/components/Pages/Admin/UserPage';
import { fetchGetAllUsers } from '@/contexts/fetchGetAllUsers';
import { fetchUserData } from '@/contexts/fetchUserData';

export default async function Home() {
    const user = await fetchUserData();
    const allUsers = await fetchGetAllUsers()
    return <UserPage user={user} allUsers={allUsers}/>;
}
