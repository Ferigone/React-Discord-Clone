import { createSlice } from "@reduxjs/toolkit";

export const serverSlice = createSlice({
  name: "server",
  initialState: {
    _id: null,
    name: null,
    icon: null,
    owner_id: null,
    created_at: null,
    channels: [],
    members: [],
    roles: [],
    region: null,
  },
  reducers: {
    setServerChannels: (state, action) => {
      return state = {
        ...state,
        channels: action.payload,
      }
    },
    setServerInfo: (state, action) => {
        return state = {
          ...state,
          ...action.payload,
        }
    },
  },
});

export const { setServerInfo, setServerChannels } = serverSlice.actions;

export const selectServer = (state: any) => state.server;
export const selectUsers = (state: any) => state.server.members;
export const selectChannels = (state: any) => state.server.channels;

export default serverSlice.reducer;
