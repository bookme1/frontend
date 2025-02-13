import { IBook } from '@/app/book/[id]/page.types';
import { IUser } from '@/lib/redux/features/user/types.ts';
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
            action.payload.forEach(book => {
                // Проверяем, есть ли уже книга с таким id
                if (!state.orderedBooks.some(existingBook => existingBook.id === book.id)) {
                    state.orderedBooks.push(book);
                }
            });
        },
        removeOrderedBook(state, action: PayloadAction<string>) {
            // Удаляем книгу по id
            state.orderedBooks = state.orderedBooks.filter(book => book.id !== action.payload);
        },
    },
});

export const { addOrderedBooks, removeOrderedBook } = orderSlice.actions;

export default orderSlice;