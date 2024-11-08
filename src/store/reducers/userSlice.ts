import { createSlice } from "@reduxjs/toolkit";
//here is where user slice is created for readux is being implemented and we an access to this layer from everywhere.
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
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
    setUserStatus: (state, action) => {
      state.user = {
        ...state.user || {},
        status: action.payload,
      }
    },
    setUserAvatar: (state, action) => {
      state.user = {
        ...state.user || {},
        avatar: action.payload,
      }
    }
  },
});

export const { login, logout, setUserData, setUserStatus, setUserAvatar } = userSlice.actions;

export const selectUser = (state: any) => state.user.user;
export const selectToken = (state: any) => state.user.token;
export const selectUserId = (state: any) => state.user.user.id;
export const selectUserAvatar = (state: any) => state.user.user.avatar;

export default userSlice.reducer;
