import HomePage from '@/components/Pages/HomePage';
import { fetchBooksets } from '@/contexts/fetchBooksets';

export default async function Home() {
    const booksets = await fetchBooksets();

    return <HomePage booksets={booksets} />;
}
