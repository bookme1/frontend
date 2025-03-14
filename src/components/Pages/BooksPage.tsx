'use client';

import { Controls } from '@/components/books/Controls';
import { BreadCrumbs } from '@/components/common/BreadCrumbs';
import SuccessInfo from '@/components/main/Modal/SuccessInfo/SuccessInfo';
import { useSelector } from '@/lib/redux';
import { FiltersResponse } from '@/lib/redux/features/book/types';
import { IUser } from '@/lib/redux/features/user/types';

import Error from '../Error/Error';
import ErrorBoundary from '../Error/ErrorBoundary';

interface HomePageProps {
    filtersData: FiltersResponse | undefined | null;
    user: IUser | undefined | null;
}

const BooksPage: React.FC<HomePageProps> = ({ filtersData, user }) => {
    const modals = useSelector((state: any) => state.modals.modals);

    return (
        <>
            <ErrorBoundary>
                <BreadCrumbs name="Каталог" />
                {filtersData ? (
                    <Controls filtersData={filtersData} user={user} />
                ) : (
                    <Error />
                )}

                <div id="modal-root"></div>
                {modals.successInfo.isOpen && <SuccessInfo />}
            </ErrorBoundary>
        </>
    );
};

export default BooksPage;
