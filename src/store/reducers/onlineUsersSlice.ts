import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    initUsers: (state, { payload }) => {
      return (state = payload);
    },
    addUser: (state, { payload }) => {
      let tempState: any = state;
      tempState = [...tempState, payload];
      return (state = tempState);
    },
    modifyUser: (state, { payload }) => {
      let tempState: any = state;
      let index = tempState.findIndex(
        (el: any) => el.userData.uid === payload.userData.uid
      );
      tempState[index] = payload;
      return (state = tempState);
    },
  },
});

export const { initUsers, addUser, modifyUser } = usersSlice.actions;

export const selectUsers = (state: any) => state.users;

export default usersSlice.reducer;
