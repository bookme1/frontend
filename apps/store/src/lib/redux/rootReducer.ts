/* Instruments */
import { adminApi } from './features/admin/adminApi';
import { bookApi } from './features/book/bookApi';
import { booksetApi } from './features/book/booksetApi';
import bookReducer from './features/books/booksSlice';
import { logsApi } from './features/logs/logsApi';
import { orderApi } from './features/order/orderApi';
import orderSlice from './features/order/orderSlice';
import { userApi } from './features/user/userApi';
import userReducer from './features/user/userSlice';
import { modalsSlice } from './slices/modalsSlice';

export const reducer = {
    modals: modalsSlice.reducer,
    user: userReducer,
    order: orderSlice.reducer,
    book: bookReducer,

    [userApi.reducerPath]: userApi.reducer,
    [bookApi.reducerPath]: bookApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [booksetApi.reducerPath]: booksetApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [logsApi.reducerPath]: logsApi.reducer,
};
