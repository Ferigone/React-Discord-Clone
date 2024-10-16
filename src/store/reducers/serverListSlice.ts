import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state as an array of Server type
const initialState: ServerListState = [];

export const serverListSlice = createSlice({
  name: "servers",
  initialState,
  reducers: {
    setServerList: (state, action: PayloadAction<Server[]>) => {
      console.log("action.payload", action.payload);
      return (state = action.payload);
    },
    addServer: (state, action: PayloadAction<Server>) => {
      return [...state, action.payload];
    },
    removeServer: (state, action: PayloadAction<string>) => {
      return state.filter((server) => server.id !== action.payload);
    },
    setServerChannels: (
      state,
      action: PayloadAction<{ serverId: string; channels: Channel[] }>
    ) => {
      return state.map((server) => {
        if (server.id === action.payload.serverId) {
          return {
            ...server,
            channels: action.payload.channels,
          };
        }
        return server;
      });
    },
    addServerChannel: (
      state,
      action: PayloadAction<{ serverId: string; channel: Channel }>
    ) => {
      return state.map((server) => {
        if (server.id === action.payload.serverId) {
          return {
            ...server,
            channels: [...server.channels, action.payload.channel],
          };
        }
        return server;
      });
    },
    removeServerChannel: (
      state,
      action: PayloadAction<{ serverId: string; channelId: string }>
    ) => {
      return state.map((server) => {
        if (server.id === action.payload.serverId) {
          return {
            ...server,
            channels: server.channels.filter(
              (channel) => channel.id !== action.payload.channelId
            ),
          };
        }
        return server;
      });
    },
    addNewMessage: (state, action) => {
      return state.map((server) => {
        return {
          ...server,
          channels: server.channels.map((channel) => {
            if (channel.id === action.payload.channelId) {
              return {
                ...channel,
                messages: [action.payload, ...channel.messages],
              };
            }
            return channel;
          }),
        };
      });
    },
    addServerUser: (
      state,
      action: PayloadAction<{ serverId: string; member: User }>
    ) => {
      return state.map((server) => {
        if (server.id === action.payload.serverId) {
          return {
            ...server,
            members: [...server.members, action.payload.member],
          };
        }
        return server;
      });
    },
    setServerUserStatus: (
      state,
      action: PayloadAction<{
        serverId: string;
        userId: string;
        status: string;
      }>
    ) => {
      return state.map((server) => {
        if (server.id === action.payload.serverId) {
          return {
            ...server,
            members: server.members.map((member) => {
              if (member.id === action.payload.userId) {
                return {
                  ...member,
                  status: action.payload.status, // Assuming status is a new field for user
                };
              }
              return member;
            }),
          };
        }
        return server;
      });
    },
  },
});

export const {
  setServerList,
  addServer,
  removeServer,
  setServerChannels,
  addServerChannel,
  removeServerChannel,
  addServerUser,
  setServerUserStatus,
  addNewMessage
} = serverListSlice.actions;

export const selectServerById = (serverId: string) => (state) =>
  state.servers.find((server) => server.id === serverId);

export const selectServerList = (state: { servers: ServerListState }) =>
  state.servers;

export const selectServerChannels = (id) => (state) => {
  const server = state.servers.find((server) => server.id === id);
  return server ? server.channels : [];
};

export const selectServerMembers = (id) => (state) => {
  const server = state.servers.find((server) => server.id === id);
  return server ? server.members : [];
};

export const selectChannelName =
  (serverId: string, channelId: string) => (state) => {
    const server = state.servers.find((server) => server.id === serverId);

    const channel = server?.channels.find(
      (channel) => channel.id === channelId
    );

    return channel?.name;
  };

export const selectChannelMessages =
  (serverId: string, channelId: string) => (state) => {
    const server = state.servers.find((server) => server.id === serverId);

    const channel = server?.channels.find(
      (channel) => channel.id === channelId
    );

    return channel?.messages;
  };

export default serverListSlice.reducer;
