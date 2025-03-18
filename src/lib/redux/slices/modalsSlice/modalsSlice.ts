import { type PayloadAction, createSlice } from '@reduxjs/toolkit';


interface ModalState {
    isOpen: boolean;
}

interface ModalsState {
    [key: string]: ModalState;
}

interface BooksSliceState {
    modals: ModalsState;

}

const initialState: BooksSliceState = {
    modals: {
        signUp: { isOpen: false },
        signIn: { isOpen: false },
        verification: { isOpen: false },
        ai: { isOpen: false },
        cart: { isOpen: false },
        catalog: { isOpen: false },
        burger: { isOpen: false },
        successInfo: { isOpen: false },
        filter: { isOpen: false },
        addBookset: { isOpen: false },
    },
};

const modalsSlice = createSlice({
    name: 'modals',
    initialState,

    reducers: {
        openModal: (state, action: PayloadAction<string>) => {
            const modalName = action.payload;
            if (state.modals[modalName]) {
                state.modals[modalName].isOpen = true;
            }
        },
        closeModal: (state, action: PayloadAction<string>) => {
            const modalName = action.payload;

            if (state.modals[modalName]) {
                state.modals[modalName].isOpen = false;
            }
        },

        closeAllModals: (state) => {
            console.log('closeAllModals');

            Object.keys(state.modals).forEach(modalName => {
                state.modals[modalName].isOpen = false;
            });
        },
    },
});

export const { openModal, closeModal, closeAllModals } =
    modalsSlice.actions;
export default modalsSlice.reducer;
export { modalsSlice };
