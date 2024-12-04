import { combineReducers } from "@reduxjs/toolkit";
import { api } from "../services/api";
import authReducer from "../features/auth/authSlice";
import modalReducer from "../features/modal/modalslice";
import chatReducer from "../features/chats/chatSlice";
import chatHistoryReducer from "../features/chats/chatHistorySlice";

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
  modal: modalReducer,
  chat: chatReducer,
  chatHistory: chatHistoryReducer,
});
export default rootReducer;
