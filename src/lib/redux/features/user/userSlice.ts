import { IUser } from '@/lib/redux/features/user/types.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';


interface UserState {
  favoriteBooks: string[];
  userData: IUser;
}

const initialState: UserState = {
  favoriteBooks: [],
  userData: {} as IUser,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addFavoriteBook(state, action: PayloadAction<string>) {
      if (!state.favoriteBooks.includes(action.payload)) {
        state.favoriteBooks.push(action.payload);
      }
    },
    removeFavoriteBook(state, action: PayloadAction<string>) {
      state.favoriteBooks = state.favoriteBooks.filter(id => id !== action.payload);
    },

    addUserData(state, action: PayloadAction<IUser>) {
      state.userData = action.payload;
    },

    clearUserData(state) {
      state.userData = {} as IUser; // Очистка userData
    },
  },
});

export const { addFavoriteBook, removeFavoriteBook, addUserData, clearUserData } = userSlice.actions;
export const selectUserData = (state: RootState): IUser => state.user.userData;

export default userSlice.reducer;