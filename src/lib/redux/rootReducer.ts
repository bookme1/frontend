/* Instruments */
import { adminApi } from './features/admin/adminApi';
import { bookApi } from './features/book/bookApi';
import { userApi } from './features/user/userApi';
import { modalsSlice } from './slices/modalsSlice';


export const reducer = {
  book: modalsSlice.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [bookApi.reducerPath]: bookApi.reducer,
  [adminApi.reducerPath]: adminApi.reducer,
};
