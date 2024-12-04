import { createSlice } from "@reduxjs/toolkit";

const chatHistorySlice = createSlice({
  name: "chatHistory",
  initialState: {
    chatHistory: [],
    nextPage: null,
    prevPage: null,
  },
  reducers: {
    appendHistory: (state, action) => {
      state.chatHistory.concat(action.payload.data);
    },
    addHistory: (state, action) => {
      state.chatHistory.push(action.payload.data);
    },
    clearHistory: (state) => {
      state.chatHistory = [];
    },
    setHistory: (state, action) => {
      state.chatHistory.push(action.payload.data);
    },
  },
});

export const { appendHistory, addHistory, clearHistory, setHistory } =
  chatHistorySlice.actions;
export default chatHistorySlice.reducer;
