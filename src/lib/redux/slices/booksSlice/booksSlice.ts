/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchAllBooks } from ".";


const initialState: BooksSliceState = {
  books: [],
  isLoading: false,
  error: null,
  filter: [],
};

export const booksSlice = createSlice({
  name: "books",
  initialState,

  reducers: {
    AddFilter(state, action) {
      state.filter = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBooks.pending, (state) => {
        state.isLoading = true;
        state.error = null;

      })
      .addCase(fetchAllBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload

      })
      .addCase(fetchAllBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

  },
});

export const { AddFilter } =
  booksSlice.actions;

/* Types */
export interface BooksSliceState {
  books: any;
  isLoading: boolean;
  error: any;
  filter: any;
}