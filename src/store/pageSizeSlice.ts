import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { basicPageSize } from '../modules/constant';

const pageSizeSlice = createSlice({
  name: 'searchParams',
  initialState: {
    pageSize: basicPageSize,
  },
  reducers: {
    updatePageSize(state, action: PayloadAction<string>) {
      state.pageSize = action.payload;
    },
  },
});

export const { updatePageSize } = pageSizeSlice.actions;

export default pageSizeSlice.reducer;
