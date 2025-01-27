'use client';

import { ConditionsOfUse } from '@/components/ConditionsOfUse';
import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';
import { IUser } from '@/lib/redux/features/user/types';

interface BooksConditionsOfUseProps {
    user: IUser | null;
    favQuantity: number | null;
}

const BooksConditionsOfUse: React.FC<BooksConditionsOfUseProps> = ({
    user,
    favQuantity,
}) => {
    return (
        <>
            <Header userData={user} favQuantity={favQuantity} />
            <ConditionsOfUse />
            <Footer />
        </>
    );
};

export default BooksConditionsOfUse;
