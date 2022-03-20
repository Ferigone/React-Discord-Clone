import { createSlice } from "@reduxjs/toolkit";
//here is where user slice is created for readux is being implemented and we an access to this layer from everywhere.
export const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    initUsers: (state, {payload}) => {
      return state = payload;
    },
    addUser: (state, {payload})=>{
      return state = [...state, payload];
    },
    modifyUser: (state, {payload})=>{
      let tempState = state;
      let index = tempState.findIndex(el=> el.userData.uid == payload.userData.uid);
      tempState[index] = payload;
      return state = tempState;
    }
  },
});

export const { initUsers, addUser, modifyUser } = usersSlice.actions;

export const selectUsers = (state) => state.users;

export default usersSlice.reducer;
