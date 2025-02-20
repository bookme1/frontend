import { IBook } from '@/app/book/[id]/page.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface OrderState {
    orderedBooks: IBook[];

}

const initialState: OrderState = {
    orderedBooks: [],

};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrderedBooks(state, action: PayloadAction<IBook[]>) {
            if (!action.payload) return;
            action.payload.forEach(book => {
                if (!state.orderedBooks.some(existingBook => existingBook.id === book.id)) {
                    state.orderedBooks.push(book);
                }
            });
        },
        removeOrderedBook(state, action: PayloadAction<string>) {
            state.orderedBooks = state.orderedBooks.filter(book => book.id !== action.payload);
        },
    },
});

export const { addOrderedBooks, removeOrderedBook } = orderSlice.actions;

export default orderSlice;