/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchAllBooks, GetFromFavorite, AddToFavorite, RemoveFromFavorite } from ".";


const initialState: BooksSliceState = {
  books: [],
  isLoading: false,
  error: null,
  filter: [],
  favorite: [],
};

export const booksSlice = createSlice({
  name: "books",
  initialState,

  reducers: {
    AddFilter(state, action) {
      state.filter = action.payload;
    },
    // AddToFavorite(state, action) {

    //   const existingFavorite = state.favorite.find((fav: any) => fav.id === action.payload.id);
    //   if (!existingFavorite) {
    //     state.favorite.push(action.payload);
    //   }

    // },
    // RemoveFavorite(state, action) {
    //   state.favorite = state.favorite.filter((fav: any) => fav.id !== action.payload.id)
    // },
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
      .addCase(GetFromFavorite.pending, (state) => {
        state.isLoading = true;
        state.error = null;

      })
      .addCase(GetFromFavorite.fulfilled, (state, action) => {
        state.isLoading = false;
        const existingFavorite = state.favorite.find((fav: any) => fav.id === action.payload.id);
        if (!existingFavorite) {
          state.favorite.push(action.payload);
        }

      })
      .addCase(GetFromFavorite.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(AddToFavorite.pending, (state) => {
        state.isLoading = true;
        state.error = null;

      })
      .addCase(AddToFavorite.fulfilled, (state, action) => {
        state.isLoading = false;
        const existingFavorite = state.favorite.find((fav: any) => fav.find((fav: any) => fav === action.payload));
        if (!existingFavorite) {
          state.favorite.push(action.payload);
        }

      })
      .addCase(AddToFavorite.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(RemoveFromFavorite.pending, (state) => {
        state.isLoading = true;
        state.error = null;

      })
      .addCase(RemoveFromFavorite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorite = state.favorite.filter((fav: any) => fav !== action.payload)

      })
      .addCase(RemoveFromFavorite.rejected, (state, action) => {
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
  favorite: any;
}