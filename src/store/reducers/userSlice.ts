import { createSlice } from "@reduxjs/toolkit";
//here is where user slice is created for readux is being implemented and we an access to this layer from everywhere.
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload;
    },
    login: (state, action) => {
      localStorage.setItem("token", action.payload);
      state.token = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = null;
    },
  },
});

export const { login, logout, setUserData } = userSlice.actions;

export const selectUser = (state: any) => state.user.user;
export const selectToken = (state: any) => state.user.token;

export default userSlice.reducer;
