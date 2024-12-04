import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    nextPage: null,
    prevPage: null,
  },
  reducers: {
    updateMessages: (state, action) => {
      if (!action.payload.messages) {
        return;
      }
      state.messages = state.messages.concat(action.payload.messages);
      state.nextPage = action.payload.nextPage;
      state.prevPage = action.payload.prevPage;
    },
    setMessages: (state, action) => {
      state.messages = action.payload.messages;
      state.nextPage = action.payload.nextPage;
      state.prevPage = action.payload.prevPage;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const { addMessage, clearMessages, setMessages, updateMessages } =
  chatSlice.actions;
export default chatSlice.reducer;
