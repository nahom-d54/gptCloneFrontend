import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    getMessages: (state) => {
      return state.messages;
    },
  },
});

export const { addMessage, clearMessages, setMessages, getMessages } =
  chatSlice.actions;
export default chatSlice.reducer;
