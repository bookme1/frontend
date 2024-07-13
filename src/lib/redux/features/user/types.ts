export enum Role {
  User,
  Moderator,
  Admin,
}

export const defaultUser: IUser = {
  id: 0,
  username: '',
  email: '',
  role: Role.User,
  fav: [],
  cart: [],
  books: [],
};

// User entity from backend without password
export interface IUser {
  id: number;
  username: string | null;
  email: string | null;
  role: Role;
  fav: string[];
  cart: string[];
  books: string[];
}

export interface loginOutputDTO {
  user: IUser;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface signInDTO {
  email: string;
  password: string;
}

export interface signUpDTO extends signInDTO {
  username: string;
}

export interface googleAuthDTO {
  email: string;
  name: string;
}

export interface userBookDTO {
  accessToken: string;
  type: BookType;
  bookId: string;
}

export interface getUserBookDTO {
  accessToken: string;
  type: BookType;
}

export enum BookType {
  Fav = 'Fav',
  Cart = 'Card',
}
