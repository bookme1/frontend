import { CardList } from './UserBooks.styles';
import { CardBought } from '@/components/common/CardBought';
import {  IOrderBook } from '@/lib/redux/features/order/types';

export default function UserBooks({
    userOrderBooks,
}: {
    userOrderBooks: IOrderBook[] | null | undefined;
}) {


    return (
        <CardList>
            {userOrderBooks?.map(
                o =>
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
