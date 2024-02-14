import type { ReduxState } from "@/lib/redux";

export const selectBooks= (state: ReduxState) => state.book.books;
export const selectFilteredBooks= (state: ReduxState) => state.book.filteredBooks;
