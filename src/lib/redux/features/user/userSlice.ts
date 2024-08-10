import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  favoriteBooks: string[];
}

const initialState: UserState = {
  favoriteBooks: [],
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
  },
});

export const { addFavoriteBook, removeFavoriteBook } = userSlice.actions;

export default userSlice.reducer;