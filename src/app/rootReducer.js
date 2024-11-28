import { combineReducers } from "@reduxjs/toolkit";
import { api } from "../services/api";
import authReducer from "../features/auth/authSlice";
import modalReducer from "../features/modal/modalslice";
import chatReducer from "../features/chats/chatSlice";

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
  modal: modalReducer,
  chat: chatReducer,
});
export default rootReducer;
