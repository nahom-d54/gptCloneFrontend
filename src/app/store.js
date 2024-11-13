import { configureStore } from "@reduxjs/toolkit";
import { api } from "../services/api";
import rootReducer from "./rootReducer";
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
