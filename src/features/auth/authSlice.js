import { createSlice } from "@reduxjs/toolkit";

const userData = JSON.parse(localStorage.getItem("userData"));

const authSlice = createSlice({
  name: "auth",
  initialState: userData || { user: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("userData", JSON.stringify(state));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("userData");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
