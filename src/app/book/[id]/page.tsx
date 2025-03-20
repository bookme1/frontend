import BookPage from '@/components/Pages/BookPage';
import { FetchBookById } from '@/contexts/fetchBookById';
import { fetchUserData } from '@/contexts/fetchUserData';

export default async function Home({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const book = await FetchBookById(id);
    const user = await fetchUserData();

    return <BookPage user={user} book={book} />;
}
