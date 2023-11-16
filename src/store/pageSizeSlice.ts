import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const pageSizeSlice = createSlice({
  name: 'searchParams',
  initialState: {
    pageSize: '12',
  },
  reducers: {
    updatePageSize(state, action: PayloadAction<string>) {
      state.pageSize = action.payload;
    },
  },
});

export const { updatePageSize } = pageSizeSlice.actions;

export default pageSizeSlice.reducer;
