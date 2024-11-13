// src/features/modal/modalSlice.js
import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modals: {}, // e.g., { modal1: true, modal2: false }
  },
  reducers: {
    openModal: (state, action) => {
      state.modals[action.payload] = true; // action.payload is modalID
    },
    closeModal: (state, action) => {
      state.modals[action.payload] = false; // action.payload is modalID
    },
    toggleModal: (state, action) => {
      const modalID = action.payload;
      state.modals[modalID] = !state.modals[modalID];
    },
  },
});

export const { openModal, closeModal, toggleModal } = modalSlice.actions;
export default modalSlice.reducer;
