import { createSlice } from "@reduxjs/toolkit";

const init = {
  _id: null,
  type: null,
  name: null,
  nsfw: null,
  permissions: [],
  messages: [],
};

export const channelSlice = createSlice({
  name: "channel",
  initialState: init,
  reducers: {
    setChannelInfo: (state, action) => {
      state = init;

      return (state = {
        ...state,
        ...action.payload,
      });
    },
    addNewMessage: (state: any, action: any) => {
      return (state = {
        ...state,
        messages: [action.payload, ...state.messages],
      });
    },
    addMessages: (state: any, action: any) => {
      return (state = {
        ...state,
        messages: [...state.messages, ...action.payload],
      });
    },
    setMessages: (state: any, action: any) => {
      return (state = {
        ...state,
        messages: action.payload,
      });
    },
  },
});

export const { setChannelInfo, addNewMessage, setMessages, addMessages } =
  channelSlice.actions;

export const selectChannel = (state: any) => state.channel;
export const selectChannelName = (state: any) => state.channel.name;
export const selectChannelId = (state: any) => state.channel._id;
export const selectMessages = (state: any) => state.channel.messages;

export default channelSlice.reducer;
