import { createSlice } from "@reduxjs/toolkit";

export const serverSlice = createSlice({
  name: "server",
  initialState: {
    id: null,
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
    addServerChannel: (state, action) => {
      return state = {
        ...state,
        channels: [...state.channels, action.payload],
      }
    },
    setServerUserStatus: (state, action) => {
      return {
        ...state,
        members: state.members.map((member: any) => {
          if (member.user.id === action.payload.userId) { // Compare with member.user.id
            return {
              ...member,
              user: {
                ...member.user,
                status: action.payload.status, // Update the status
              },
            };
          }
          return member;
        }),
      };
    }
  },
});

export const { setServerInfo, setServerChannels, addServerChannel, setServerUserStatus } = serverSlice.actions;

export const selectServer = (state: any) => state.server;
export const selectUsers = (state: any) => state.server.members;
export const selectChannels = (state: any) => state.server.channels;

export default serverSlice.reducer;
