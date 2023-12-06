// features/home/homeThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
import { home } from '../../mock';

// 创建一个异步 thunk action
export const fetchCompanyInfo = createAsyncThunk(
  'home/fetchCompanyInfo',
  async (_, { rejectWithValue }) => {
    try {
      // const response = await axios.get('/api/company-info');
      console.log("response======>",home.data)
      return home.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
