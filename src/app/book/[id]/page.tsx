import BookPage from '@/components/Pages/BookPage';
import { FetchBookById } from '@/contexts/fetchBookById';
import { fetchUserData } from '@/contexts/fetchUserData';

interface PageProps {
    params: {
        id: string; // Динамический параметр из маршрута
    };
}

export default async function Home({ params }: PageProps) {
    const { id } = params;
    const book = await FetchBookById(id);
    const user = await fetchUserData();

    return <BookPage user={user} book={book} />;
}
