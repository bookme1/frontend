'use client';

import { IBook } from '../../app/book/[id]/page.types';
import { useSelector } from '../../lib/redux';
import { IUser } from '../../lib/redux/features/user/types';
import Error from '../Error/Error';
import ErrorBoundary from '../Error/ErrorBoundary';
import { MainInformation } from '../book/MainInformation';
import { BreadCrumbs } from '../common/BreadCrumbs';
import SuccessInfo from '../main/Modal/SuccessInfo/SuccessInfo';

interface BookPageProps {
    user: IUser | null;
    book: IBook | null | undefined;
}

const BookPage: React.FC<BookPageProps> = ({ user, book }) => {
    const modals = useSelector((state: any) => state.modals.modals);

    return (
        <>
            <ErrorBoundary>
                {!book && <Error />}
                {book && <BreadCrumbs name={book.title} />}
                {book && (
                    <MainInformation
                        book={book}
                        characteristics={{
                            language: book.lang,
                            publish: book.pub,
                            pages: book.pages,
                            description: book.desc,
                            genres: book.genre,
                        }}
                        isAuthorized={user ? true : false}
                    />
                )}

                {/* <Reviews /> */}
                {/* <SliderLastBooks /> */}

                <div id="modal-root"></div>
                {modals.successInfo.isOpen && <SuccessInfo />}
            </ErrorBoundary>
        </>
    );
};

export default BookPage;
