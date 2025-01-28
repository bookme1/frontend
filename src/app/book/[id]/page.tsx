import BookPage from '@/components/Pages/BookPage';
import { FetchBookById } from '@/contexts/fetchBookById';
import { fetchGetFavoritesQuantity } from '@/contexts/fetchGetFavoritesQuantity';
import { fetchUserData } from '@/contexts/fetchUserData';
import { BookType } from '@/lib/redux/features/user/types';

interface PageProps {
    params: {
        id: string; // Динамический параметр из маршрута
    };
}

export default async function Home({ params }: PageProps) {
    const { id } = params;
    const book = await FetchBookById(id);
    const user = await fetchUserData();
    const favQuantity = await fetchGetFavoritesQuantity(BookType.Fav);

    return <BookPage user={user} book={book} favQuantity={favQuantity}/>;
}
