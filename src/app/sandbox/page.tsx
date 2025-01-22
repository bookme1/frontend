// Server Component Example
import { fetchUserData } from '@/app/sandbox/fetchUserData';

export default async function Page() {
    const user = await fetchUserData();

    return (
        <div>
            {user ? (
                <h1>Welcome, {user.username}!</h1>
            ) : (
                <h1>User not found</h1>
            )}
        </div>
    );
}
