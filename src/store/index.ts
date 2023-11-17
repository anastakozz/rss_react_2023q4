import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import pageSizeReducer from './pageSizeSlice';
import { showsApi } from './api';

const store = configureStore({
  reducer: {
    search: searchReducer,
    pageSize: pageSizeReducer,
    [showsApi.reducerPath]: showsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(showsApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
