import type { ReduxState } from "@/lib/redux";

export const selectBooks= (state: ReduxState) => state.book.books;