export interface Header {
    createdBy: number;
    createdAt: string;
}

export interface BookSetRequest {
    title: string;
    books: number[];
    header: Header;
}

export type BookSetResponse = {
    id: number;
    title: string;
    header: {
        createdBy: number;
        createdAt: string;
    };
    books: {
        id: string;
        title: string;
        price: string;
        desc: string;
        author: string;
        pub: string;
        pages: number;
    }[];
};