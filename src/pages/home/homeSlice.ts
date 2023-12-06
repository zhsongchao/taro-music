// features/home/homeSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchCompanyInfo } from './homeThunks';

export const homeSlice = createSlice({
  name: 'home',
  initialState: {
    companyInfo: {},
    partnerInfo:{},
    productsList: [[],[],[],[]],
    bannerList:[],
    loading: false,
    error: null,
  },
  reducers: {
    // 同步 reducers...
  },
  extraReducers: {
    // 处理异步 thunk action 的生命周期
    [fetchCompanyInfo.pending]: (state) => {
      state.loading = true;
    },
    [fetchCompanyInfo.fulfilled]: (state, action) => {
      state.companyInfo = action.payload.companyInfo;
      state.bannerList = action.payload.bannerList;
      state.partnerInfo = action.payload.partnerInfo;
      state.productsList = action.payload.productsList;
      state.loading = false;
    },
    [fetchCompanyInfo.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export default homeSlice.reducer;
