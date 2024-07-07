import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import { GetFromFavorite, AddToFavorite, RemoveFromFavorite } from ".";


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
    successInfo: { isOpen: false },
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
  },
});

export const { openModal, closeModal } = modalsSlice.actions;
export default modalsSlice.reducer;
export { modalsSlice };