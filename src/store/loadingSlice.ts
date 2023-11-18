import { createSlice } from '@reduxjs/toolkit';
import { showsApi } from './api';

const loadingSlice = createSlice({
  name: 'loaders',
  initialState: {
    isLoadingShowData: false,
    isLoadingShowsList: false,
    isLoadingShowsNumber: false
  },
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      showsApi.endpoints?.getShowData.matchPending,
      (state) => {
        state.isLoadingShowData = true;
      }
    );
    builder.addMatcher(
      showsApi.endpoints?.getShowData.matchFulfilled,
      (state) => {
        state.isLoadingShowData = false;
      }
    );
    builder.addMatcher(
      showsApi.endpoints?.getShowData.matchRejected,
      (state) => {
        state.isLoadingShowData = false;
      }
    );
    builder.addMatcher(
      showsApi.endpoints?.getShowsList.matchPending,
      (state) => {
        state.isLoadingShowsList = true;
      }
    );
    builder.addMatcher(
      showsApi.endpoints?.getShowsList.matchFulfilled,
      (state) => {
        state.isLoadingShowsList = false;
      }
    );
    builder.addMatcher(
      showsApi.endpoints?.getShowsList.matchRejected,
      (state) => {
        state.isLoadingShowsList = false;
      }
    );
    builder.addMatcher(
      showsApi.endpoints?.getShowsNumber.matchPending,
      (state) => {
        state.isLoadingShowsNumber = true;
      }
    );
    builder.addMatcher(
      showsApi.endpoints?.getShowsNumber.matchFulfilled,
      (state) => {
        state.isLoadingShowsNumber = false;
      }
    );
    builder.addMatcher(
      showsApi.endpoints?.getShowsNumber.matchRejected,
      (state) => {
        state.isLoadingShowsNumber = false;
      }
    );
  },
});

export default loadingSlice.reducer;
2;
