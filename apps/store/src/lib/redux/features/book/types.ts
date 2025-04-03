export interface Header {
    createdBy: number;
    createdAt: string;
}

export type BookSetRequest = {
    id: number;
    title: string;
    header: Header;
    books: string[];
};

export type BookSetResponse = {
    id: number;
    title: string;
    header: {
        createdBy: number;
        createdAt: string;
    };
    books: {
        id: string;
        header: {};
        original: {};
        referenceNumber: string;
        art: string;
        title: string;
        url: string;
        price: string;
        pages: number;
        lang: string;
        desc: string;
        author: string;
        pub: string;
        pubDate: string;
        genre: string;
        formatMobi: string;
        formatPdf: string;
        formatEpub: string;
    }[];
};

export type FiltersResponse = {
    authors: string[];
    publishers: string[];
    genres: string[];
    languages: string[];
    minPrice: number;
    maxPrice: number;
}