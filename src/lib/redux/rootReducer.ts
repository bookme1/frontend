/* Instruments */
import { adminApi } from './features/admin/adminApi';
import { bookApi } from './features/book/bookApi';
import { userApi } from './features/user/userApi';
import { modalsSlice } from './slices/modalsSlice';
import { booksetApi } from './features/book/booksetApi';
import userReducer from './features/user/userSlice';

import { orderApi } from './features/order/orderApi';
import orderSlice from './features/order/orderSlice';




export const reducer = {
  modals: modalsSlice.reducer,
  user: userReducer,
  order: orderSlice.reducer,

  [userApi.reducerPath]: userApi.reducer,
  [bookApi.reducerPath]: bookApi.reducer,
  [adminApi.reducerPath]: adminApi.reducer,
  [booksetApi.reducerPath]: booksetApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
};

