'use client';

import { Controls } from '@/components/books/Controls';
import { BreadCrumbs } from '@/components/common/BreadCrumbs';
import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';
import SuccessInfo from '@/components/main/Modal/SuccessInfo/SuccessInfo';
import { useSelector } from '@/lib/redux';
import { FiltersResponse } from '@/lib/redux/features/book/types';
import { IUser } from '@/lib/redux/features/user/types';

interface HomePageProps {
    user: IUser | null;
    filtersData: FiltersResponse | null;
}

const BooksPage: React.FC<HomePageProps> = ({ user, filtersData }) => {
    const modals = useSelector((state: any) => state.modals.modals);

    return (
        <>
            <Header userData={user} />
            <BreadCrumbs name="Каталог" />
            <Controls filtersData={filtersData} />
            <Footer />
            <div id="modal-root"></div>
            {modals.successInfo.isOpen && <SuccessInfo />}
        </>
    );
};

export default BooksPage;
