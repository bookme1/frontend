import { IBook } from '@/app/book/[id]/page.types';

import { Status } from '../order/types';

export enum Role {
    User = 'User',
    Moderator = 'Moderator',
    Admin = 'Admin',
    Author = 'Author',
}

// User entity from backend without password
export interface IUser {
    id: number;
    username: string | null;
    email: string | null;
    role: Role;
    fav: string[];
    cart: string[];
    books: string[];
    orders: Order[];
}

export interface Order {
    id: string;
    amount: string;
    createdAt: Date;
    status: Status;
    orderBooks: OrderBook[];
}

export interface OrderBook {
    book: IBook;
    id: string;
    orderedFormats: string;
    transId: string;
}

export interface loginOutputDTO {
    user: IUser;
}

export interface signInDTO {
    email: string;
    password: string;
}

export interface signUpDTO extends signInDTO {
    username: string;
    role?: string;
}

export interface googleAuthDTO {
    email: string;
    name: string;
}

export interface userBookDTO {
    type: BookType;
    bookId: string;
}

export interface getUserBookDTO {
    type: BookType;
}

export enum BookType {
    Fav = 'Fav',
    Cart = 'Cart',
}

export type UserResponse = IUser | loginOutputDTO | null;
