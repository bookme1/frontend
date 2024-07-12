/* Core */
import {
  type TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from 'react-redux';

import {
  type Action,
  type ThunkAction,
  configureStore,
} from '@reduxjs/toolkit';

import { adminApi } from './features/admin/adminApi';
import { bookApi } from './features/book/bookApi';
import { userApi } from './features/user/userApi';

/* Instruments */
import { reducer } from './rootReducer';

export const reduxStore = configureStore({
  reducer: reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(bookApi.middleware)
      .concat(adminApi.middleware),
});
export const useDispatch = () => useReduxDispatch<ReduxDispatch>();
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;

/* Types */
export type RootState = ReturnType<typeof reduxStore.getState>;
export type ReduxStore = typeof reduxStore;
export type ReduxState = ReturnType<typeof reduxStore.getState>;
export type ReduxDispatch = typeof reduxStore.dispatch;
export type ReduxThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  Action
>;
