import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'searchParams',
  initialState: {
    search: '',
  },
  reducers: {
    updateSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
  },
});

export const { updateSearch } = searchSlice.actions;

export default searchSlice.reducer;
