'use client';

import Header from './Header';
import { useBooks } from '@/components/hooks/useBooks';

const HeaderWrapper = () => {
    const books = useBooks();

    return <Header booksArr={books} />;
};

export default HeaderWrapper;
