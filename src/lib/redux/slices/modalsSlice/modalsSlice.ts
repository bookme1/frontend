import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

// import { GetFromFavorite, AddToFavorite, RemoveFromFavorite } from ".";

interface ModalState {
  isOpen: boolean;
}

interface ModalsState {
  [key: string]: ModalState;
}

interface BooksSliceState {
  modals: ModalsState;
  openModal: boolean;
  modalContent: string;
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
  openModal: false,
  modalContent: '',
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  selectors: {
    selectOpenModal: state => state.openModal,
    selectModalContent: state => state.modalContent,
  },
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
    setModalStatus: (state, action: PayloadAction<boolean>) => {
      state.openModal = action.payload;
    },
    setModalContent: (state, action: PayloadAction<string>) => {
      state.modalContent = action.payload;
    },
  },
});

export const { openModal, closeModal, setModalStatus, setModalContent } =
  modalsSlice.actions;
export default modalsSlice.reducer;
export const { selectOpenModal, selectModalContent } = modalsSlice.selectors;
export { modalsSlice };
