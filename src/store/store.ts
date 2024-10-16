import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import appReducer from "./reducers/appSlice";
import onlineUsersReducer from "./reducers/onlineUsersSlice";
import modalSlice from "./reducers/modalSlice";
import channelSlice from "./reducers/channelSlice";
import serverListSlice from "./reducers/serverListSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
    users: onlineUsersReducer,
    modal: modalSlice,
    channel: channelSlice,
    servers: serverListSlice,
  },
});
