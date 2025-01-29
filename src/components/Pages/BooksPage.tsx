'use client';

import { Controls } from '@/components/books/Controls';
import { BreadCrumbs } from '@/components/common/BreadCrumbs';
import SuccessInfo from '@/components/main/Modal/SuccessInfo/SuccessInfo';
import { useSelector } from '@/lib/redux';
import { FiltersResponse } from '@/lib/redux/features/book/types';

interface HomePageProps {
    filtersData: FiltersResponse | undefined | null;
}

const BooksPage: React.FC<HomePageProps> = ({ filtersData }) => {
    const modals = useSelector((state: any) => state.modals.modals);

    return (
        <>
            <BreadCrumbs name="Каталог" />
            <Controls filtersData={filtersData} />

            <div id="modal-root"></div>
            {modals.successInfo.isOpen && <SuccessInfo />}
        </>
    );
};

export default BooksPage;
