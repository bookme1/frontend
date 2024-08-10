/* Instruments */
import { adminApi } from './features/admin/adminApi';
import { bookApi } from './features/book/bookApi';
import { userApi } from './features/user/userApi';
import { modalsSlice } from './slices/modalsSlice';
import userReducer from './features/user/userSlice';

export const reducer = {
  modals: modalsSlice.reducer,
  user: userReducer,
  [userApi.reducerPath]: userApi.reducer,
  [bookApi.reducerPath]: bookApi.reducer,
  [adminApi.reducerPath]: adminApi.reducer,
};

