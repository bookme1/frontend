import styles from './UserBooks.module.css';

import { IOrderBook } from '../../../lib/redux/features/order/types';
import { CardBought } from '../../common/CardBought';

export default function UserBooks({
    userOrderBooks,
}: {
    userOrderBooks: IOrderBook[] | null | undefined;
}) {
    return (
        <ul className={styles.cardList}>
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
        </ul>
    );
}
