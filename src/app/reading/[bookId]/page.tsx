import ReadingBookIdPage from '@/components/Pages/ReadingBookIdPage';

import { fetchUserData } from '@/contexts/fetchUserData';


export default async function Home() {
    const user = await fetchUserData();

    return <ReadingBookIdPage user={user} />;
}
