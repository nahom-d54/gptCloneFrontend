import { createSlice } from "@reduxjs/toolkit";
import decodeJWT from "../../config/jwtDecode";
const userData = (() => {
  try {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (data && data.token) {
      const decoded = decodeJWT(data.token);
      console.log(decoded);
      if (decoded.payload.exp * 1000 < Date.now()) {
        localStorage.removeItem("userData");
        return null;
      }
      return data;
    }
    return null;
  } catch (error) {
    return null;
  }
})();

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
