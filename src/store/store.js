import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import appReducer from './reducers/appSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
  },
});
