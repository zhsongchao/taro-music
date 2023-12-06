import { configureStore } from '@reduxjs/toolkit';
import homeReducer from '../pages/home/homeSlice';
import userReducer from '../pages/myProfile/profileSlice';

const store = configureStore({
  reducer: {
    home: homeReducer,
    user: userReducer,
  },
});

export default store;
