import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import appReducer from './reducers/appSlice';
import onlineUsersReducer from './reducers/onlineUsersSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
    users: onlineUsersReducer
  },
});
