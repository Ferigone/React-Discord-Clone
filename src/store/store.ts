import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import appReducer from "./reducers/appSlice";
import onlineUsersReducer from "./reducers/onlineUsersSlice";
import modalSlice from "./reducers/modalSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
    users: onlineUsersReducer,
    modal: modalSlice,
  },
});
