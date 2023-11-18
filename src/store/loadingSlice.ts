import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loaders',
  initialState: {
    isLoadingShowData: false,
    isLoadingShowsList: false,
  },
  reducers: {
    setLoadingShowData: (state, action: PayloadAction<boolean>) => {
      state.isLoadingShowData = action.payload;
    },
    setLoadingShowsList: (state, action: PayloadAction<boolean>) => {
      state.isLoadingShowsList = action.payload;
    },
  },
});

export const {
  setLoadingShowData,
  setLoadingShowsList,
} = loadingSlice.actions;

export default loadingSlice.reducer;
