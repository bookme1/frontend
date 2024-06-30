enum Role {
  User,
  Moderator,
  Admin,
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
  name: string;
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

enum BookType {
  Fav,
  Cart,
}
