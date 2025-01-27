'use client';

import { IBook } from '@/app/book/[id]/page.types';
import { MainInformation } from '@/components/book/MainInformation';
import { BreadCrumbs } from '@/components/common/BreadCrumbs';
import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';
import SuccessInfo from '@/components/main/Modal/SuccessInfo/SuccessInfo';
import { useSelector } from '@/lib/redux';
import { IUser } from '@/lib/redux/features/user/types';

interface BookPageProps {
    user: IUser | null;
    book: IBook | null | undefined;
    favQuantity: number | null;
}

const BookPage: React.FC<BookPageProps> = ({ user, book, favQuantity }) => {
    const modals = useSelector((state: any) => state.modals.modals);

    return (
        <>
            <Header userData={user} favQuantity={favQuantity} />
            {book && <BreadCrumbs name={book.title} />}
            {book && (
                <MainInformation
                    book={book}
                    characteristics={{
                        language: book.lang,
                        publish: book.pub,
                        pages: book.pages,
                        description: book.desc,
                    }}
                    isAuthorized={user ? true : false}
                    // pathname={pathname}
                />
            )}

            {/* <Reviews /> */}
            {/* <SliderLastBooks /> */}
            <Footer />
            <div id="modal-root"></div>
            {modals.successInfo.isOpen && <SuccessInfo />}
        </>
    );
};

export default BookPage;
