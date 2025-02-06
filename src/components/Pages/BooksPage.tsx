'use client';

import { IBook } from '@/app/book/[id]/page.types';
import { Controls } from '@/components/books/Controls';
import { BreadCrumbs } from '@/components/common/BreadCrumbs';
import SuccessInfo from '@/components/main/Modal/SuccessInfo/SuccessInfo';
import { useSelector } from '@/lib/redux';
import { FiltersResponse } from '@/lib/redux/features/book/types';
import { IUser } from '@/lib/redux/features/user/types';

interface HomePageProps {
    filtersData: FiltersResponse | undefined | null;
    user: IUser | undefined | null;
}

const BooksPage: React.FC<HomePageProps> = ({ filtersData, user }) => {
    const modals = useSelector((state: any) => state.modals.modals);

    return (
        <>
            <BreadCrumbs name="Каталог" />
            <Controls filtersData={filtersData} user={user} />

            <div id="modal-root"></div>
            {modals.successInfo.isOpen && <SuccessInfo />}
        </>
    );
};

export default BooksPage;
