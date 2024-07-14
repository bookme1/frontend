import { useEffect, useState } from 'react';

import { CardList } from './UserBooks.styles';
import { bookService } from '@/api/book/bookService';
import { CardBought } from '@/components/common/CardBought';
import { IOrderBook } from '@/lib/redux/features/order/types';

export default function UserBooks({
    accessToken,
}: {
    accessToken: string | null;
}) {
    const [orderedBooks, setOrderedBooks] = useState<IOrderBook[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            const books = await bookService.takeAllOrderedBooks(accessToken);
            setOrderedBooks(books);
            setLoading(false);
        };

        fetchBooks();
    }, [accessToken]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!orderedBooks || orderedBooks.length === 0) {
        return <p>Нажаль, книг не було знайдено :(</p>;
    }

    return (
        <CardList>
            {orderedBooks.map(
                (o: IOrderBook) =>
                    o.book && (
                        <CardBought
                            key={o.book.id}
                            book={o.book}
                            epubLink={o.epubLink}
                            pdfLink={o.pdfLink}
                            mobiLink={o.mobiLink}
                        />
                    )
            )}
        </CardList>
    );
}
