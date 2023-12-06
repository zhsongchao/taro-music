// features/home/homeSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchUserInfo } from './profileThunks';

export const profileSlice = createSlice({
  name: 'myProfile',
  initialState: {
    userInfo: {},
    loading: false,
    error: null,
  },
  reducers: {
    // 同步 reducers...
  },
  extraReducers: {
    // 处理异步 thunk action 的生命周期
    [fetchUserInfo.pending]: (state) => {
      state.loading = true;
    },
    [fetchUserInfo.fulfilled]: (state, action) => {
      state.userInfo = action.payload;
      state.loading = false;
    },
    [fetchUserInfo.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export default profileSlice.reducer;
