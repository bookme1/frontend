import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IUser } from './types';

import { RootState } from '../../store';

interface UserState {
    favoriteBooks: string[];
    userData: IUser | null;
}

const initialState: UserState = {
    favoriteBooks: [],
    userData: null,
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
            state.favoriteBooks = state.favoriteBooks.filter(
                id => id !== action.payload
            );
        },

        addUserData(state, action: PayloadAction<IUser>) {
            state.userData = action.payload;
        },

        clearUserData(state) {
            state.userData = {} as IUser; // Очистка userData
        },
    },
});

export const {
    addFavoriteBook,
    removeFavoriteBook,
    addUserData,
    clearUserData,
} = userSlice.actions;
export const selectUserData = (state: RootState): IUser | null =>
    state.user.userData;

export default userSlice.reducer;
