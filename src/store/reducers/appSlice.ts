import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    channelId: null,
    channelName: null,
    allDataLoaded: false,
    lastSelectedChannels: localStorage.getItem("lastSelectedChannels")
      ? JSON.parse(localStorage.getItem("lastSelectedChannels") || "")
      : [],
    lastSelectedServer: localStorage.getItem("lastSelectedServer")
      ? JSON.parse(localStorage.getItem("lastSelectedServer") || "")
      : null,
  },
  reducers: {
    setChannelInfo: (state, action) => {
      state.channelId = action.payload.channelId;
      state.channelName = action.payload.channelName;
    },
    setAllDataLoaded: (state, action) => {
      state.allDataLoaded = true;
    },
    setLastSelectedChannel: (state, action) => {
      const { channel_id, server_id } = action.payload;

      if (channel_id === null || server_id === null) {
        return;
      }
      const index = state.lastSelectedChannels.findIndex(
        (item: any) => item.server_id === server_id
      );
      if (index !== -1) {
        state.lastSelectedChannels[index] = { channel_id, server_id };
      } else {
        state.lastSelectedChannels.push({ channel_id, server_id });
      }

      localStorage.setItem(
        "lastSelectedChannels",
        JSON.stringify(state.lastSelectedChannels)
      );
    },
    setLastSelectedServer: (state, action) => {
      const { server_id } = action.payload;

      if (server_id === null) {
        return;
      }

      state.lastSelectedServer = { server_id };

      localStorage.setItem(
        "lastSelectedServer",
        JSON.stringify(state.lastSelectedServer)
      );
    },
  },
});

export const { setChannelInfo, setAllDataLoaded, setLastSelectedChannel, setLastSelectedServer } =
  appSlice.actions;

export const selectChannelId = (state: any) => state.app.channelId;
export const selectChannelName = (state: any) => state.app.channelName;
export const selectAllDataLoaded = (state: any) => state.app.allDataLoaded;
export const selectLastSelectedChannels = (state: any) =>
  state.app.lastSelectedChannels;
export const selectLastSelectedServer = (state: any) => state.app.lastSelectedServer;

export default appSlice.reducer;
