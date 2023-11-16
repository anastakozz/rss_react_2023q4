import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import pageSizeReducer from './pageSizeSlice';

const store = configureStore({
  reducer: { search: searchReducer, pageSize: pageSizeReducer },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
