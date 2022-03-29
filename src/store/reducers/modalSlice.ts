import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    addServer: false,
  },
  reducers: {
    setAddServerModal: (state, { payload }) => {
      let tempState = state;
      tempState.addServer = payload;
      return (state = tempState);
    },
  },
});

export const { setAddServerModal } = modalSlice.actions;

export const addServer = (state: any) => state.modal.addServer;

export default modalSlice.reducer;
