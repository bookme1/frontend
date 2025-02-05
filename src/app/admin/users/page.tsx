import UserPage from '@/components/Pages/Admin/UserPage';
import { fetchGetAllUsers } from '@/contexts/fetchGetAllUsers';

export default async function Home() {
    const allUsers = await fetchGetAllUsers();
    return <UserPage allUsers={allUsers} />;
}
