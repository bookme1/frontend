/* Instruments */
import { bookApi } from "./features/book/bookApi";
import { userApi } from "./features/user/userApi";
import { booksSlice } from "./slices";

export const reducer = {
  book: booksSlice.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [bookApi.reducerPath]: bookApi.reducer,
};
