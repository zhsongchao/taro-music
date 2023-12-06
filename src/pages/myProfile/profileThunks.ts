// features/home/homeThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// 创建一个异步 thunk action
export const fetchUserInfo = createAsyncThunk(
  'my/userInfo',
  async (_, { rejectWithValue }) => {
    try {
      // const response = await axios.get('/api/user-info');
      // return response.data;
      console.log("fetchUserInfo response======>")
      return {};
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
