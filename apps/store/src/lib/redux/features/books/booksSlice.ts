import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IBookShort {
    id: string;
    title: string;
    url: string;
    price: number;
}

interface BookState {
    books: IBookShort[];
    lastFetchedAt: number | null;
}

const initialState: BookState = {
    books: [],
    lastFetchedAt: null,
};

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        setBooks(state, action: PayloadAction<IBookShort[]>) {
            state.books = action.payload;
            state.lastFetchedAt = Date.now();
        },
        clearBooks(state) {
            state.books = [];
            state.lastFetchedAt = null;
        },
    },
});

export const { setBooks, clearBooks } = bookSlice.actions;

export default bookSlice.reducer;
